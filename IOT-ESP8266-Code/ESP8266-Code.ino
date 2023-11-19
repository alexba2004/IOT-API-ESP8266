#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <DHT.h>

const char* ssid = ""; // Escribir nombre de la Red WIFI
const char* password = ""; // Escribir contraseña de la Red WIFI
String url = "http://"/* Insertar IPv4 */":3000/api/sensors/insertOne";

#define DHTPIN 2 // Pin de datos conectado al pin D2
#define DHTTYPE DHT22 // Tipo de sensor DHT (DHT11 o DHT22), en este caso DHT22
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  delay(10);

  // Conectar WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.println("No se puede establecer la conexión con la red");
    delay(2000);
  }

  // Inicializar el sensor DHT
  dht.begin();
}

void loop() {
  HTTPClient http;
  WiFiClient client;

  if (http.begin(client, url)) // Iniciar conexión
  {
    // Leer datos del sensor
    float humidity = dht.readHumidity();
    float temperatureC = dht.readTemperature();

    // Verificar si la lectura fue exitosa
    if (isnan(humidity) || isnan(temperatureC)) {
      Serial.println("Error al leer datos del sensor DHT!");
      return;
    }

    // Convertir temperatura a Fahrenheit
    float temperatureF = celsiusToFahrenheit(temperatureC);

    // Calcular índice de calor
    float heatIndexC = dht.computeHeatIndex(temperatureC, humidity);
    float heatIndexF = celsiusToFahrenheit(heatIndexC);

    // POST
    Serial.println("[HTTP] POST...");
    http.addHeader("Content-Type", "application/json");

    // Construir el cuerpo del mensaje JSON con los datos del sensor
    String jsonBody = "{"
                      "\"humidity\":" + String(humidity) +
                      ",\"temperaturec\":" + String(temperatureC) +
                      ",\"temperaturef\":" + String(temperatureF) +
                      ",\"heatindexc\:" + String(heatIndexC) +
                      ",\"heatindexf\":" + String(heatIndexF) +
                      "}";
    
    int httpCode = http.POST(jsonBody); // Realizar petición

    if (httpCode > 0) {
      Serial.printf("[HTTP] POST... code: %d\n", httpCode);

      if (httpCode == HTTP_CODE_OK || httpCode == HTTP_CODE_MOVED_PERMANENTLY) {
        String respuesta = http.getString();  // Obtener respuesta
        Serial.println(respuesta);  // Mostrar respuesta por serial
      }
    } else {
      Serial.printf("[HTTP] POST... failed, error: %s\n", http.errorToString(httpCode).c_str());
    }

    http.end();
  } else {
    Serial.printf("[HTTP] Unable to connect\n");
  }

  delay(30000); // Esperar 30 segundos antes de realizar la siguiente lectura y envío
}

// Función para convertir temperatura de Celsius a Fahrenheit
float celsiusToFahrenheit(float celsius) {
  return (celsius * 9.0 / 5.0) + 32.0;
}
