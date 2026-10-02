#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include "wifi_config.h"

const unsigned long REGISTER_INTERVAL_MS = 30000L;
const int TONE_FREQ = 1000;

String deviceId = DEVICE_ID;
String deviceName = DEVICE_NAME;
String deviceZone = DEVICE_ZONE;
unsigned long lastRegisterAt = 0;

void toneOutput(int frequency, int durationMs) {
  ledcSetup(0, 2000, 8);
  ledcAttachPin(SPEAKER_PIN, 0);
  ledcWriteTone(0, frequency);
  delay(durationMs);
  ledcWriteTone(0, 0);
}

String getJsonStatus() {
  DynamicJsonDocument doc(512);
  doc["id"] = deviceId;
  doc["name"] = deviceName;
  doc["zone"] = deviceZone;
  doc["status"] = "online";
  doc["volume"] = 80;
  doc["temperature"] = 35.2;
  doc["uptime"] = millis() / 1000;

  String output;
  serializeJson(doc, output);
  return output;
}

void registerDevice() {
  WiFiClient client;
  HTTPClient http;

  String url = String(MANAGEMENT_SERVER) + "/api/device/register";
  http.begin(client, url);
  http.addHeader("Content-Type", "application/json");

  DynamicJsonDocument payload(512);
  payload["id"] = deviceId;
  payload["name"] = deviceName;
  payload["ip"] = WiFi.localIP().toString();
  payload["zone"] = deviceZone;
  payload["volume"] = 80;
  payload["temperature"] = 35.2;
  payload["uptime"] = millis() / 1000;

  String body;
  serializeJson(payload, body);

  int statusCode = http.POST(body);
  Serial.printf("Register response: %d\n", statusCode);
  if (statusCode > 0) {
    String response = http.getString();
    Serial.println(response);
  }

  http.end();
}

void handleCommand(String commandText) {
  DynamicJsonDocument doc(512);
  DeserializationError error = deserializeJson(doc, commandText);

  if (error) {
    Serial.println("Invalid JSON command");
    return;
  }

  String command = doc["command"] | "";
  String value = doc["value"] | "";

  if (command == "play") {
    Serial.println("Playing announcement: " + value);
    toneOutput(TONE_FREQ, 500);
  } else if (command == "volume") {
    int volume = doc["value"] | 80;
    Serial.printf("Volume changed to %d\n", volume);
  } else if (command == "test") {
    Serial.println("Running speaker test");
    toneOutput(880, 300);
    delay(200);
    toneOutput(1320, 300);
  }
}

void connectToWifi() {
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println();
  Serial.print("Connected: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  connectToWifi();
  registerDevice();
  lastRegisterAt = millis();
}

void loop() {
  if (millis() - lastRegisterAt > REGISTER_INTERVAL_MS) {
    registerDevice();
    lastRegisterAt = millis();
  }

  if (Serial.available()) {
    String command = Serial.readStringUntil('\n');
    command.trim();
    if (command.length() > 0) {
      handleCommand(command);
    }
  }

  delay(100);
}

