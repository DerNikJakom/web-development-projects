import Debug "mo:base/Debug";
import Time "mo:base/Time";
import Float "mo:base/Float";

actor DBank {
  stable var currentValue : Float = 300;
  // currentValue := 300;
  Debug.print(debug_show (currentValue));

  stable var startTime = Time.now();
  // startTime := Time.now();
  Debug.print(debug_show (startTime));

  // let id = 2345146;
  // Debug.print(debug_show (id));

  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show (currentValue));
  };

  public func withdraw(amount : Float) {
    if (amount <= currentValue) {
      currentValue -= amount;
      Debug.print(debug_show (currentValue));
    } else {
      Debug.print("Amount too large");
    };
  };

  public query func checkBalance() : async Float {
    return currentValue;
  };

  // topUp();

  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS / 1000000000;
    currentValue := currentValue * (1.0001 ** Float.fromInt(timeElapsedS));
    startTime := currentTime;
  };
};
