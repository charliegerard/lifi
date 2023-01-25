#define LED_PIN 9
//#define PERIOD 1000
#define PERIOD 14

//char* string = "AND";
const char *string = "https://buy.stripe.com/test_dR6bLT5Ckaz2fWoeVZ";
int string_length;

void setup() {
  pinMode(LED_PIN, OUTPUT);
  Serial.begin(9600);
  int string_length = strlen(string);
}

void loop() {
   for(int i = 0; i < string_length; i++)
   {
    send_byte(string[i]);
   }
   delay(100);
}

void send_byte(char my_byte){
  digitalWrite(LED_PIN, LOW);
  delay(PERIOD);

  uint8_t bin;
//  bin = *((uint8_t*)my_byte);
//  bin = uint8_t(my_byte);
//  Serial.println(my_byte, BIN); 
//Serial.print(bin);

  //transmission;
  for(int i = 0; i < 8; i++){
    int led_state = bitRead(my_byte, i);
//    Serial.println(t);
//    int t = 0x01 << i;
//    int led_state = my_byte&t;
    digitalWrite(LED_PIN, led_state != 0);
    delay(PERIOD);
  }
//  Serial.println("Byte sent");
  digitalWrite(LED_PIN, HIGH);
  delay(PERIOD);
}
