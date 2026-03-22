import Principal "mo:core/Principal";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Text "mo:core/Text";
import Runtime "mo:core/Runtime";
import Iter "mo:core/Iter";

actor {
  type Registration = {
    name : Text;
    email : Text;
    phone : Text;
    country : Text;
    confirmed : Bool;
  };

  module Registration {
    public func compare(registration1 : Registration, registration2 : Registration) : Order.Order {
      switch (Text.compare(registration1.email, registration2.email)) {
        case (#equal) { Text.compare(registration1.name, registration2.name) };
        case (order) { order };
      };
    };
  };

  let registrations = Map.empty<Text, Registration>();

  let maxSeats = 200;

  public shared ({ caller }) func register(name : Text, email : Text, phone : Text, country : Text) : async () {
    if (getRemainingSeatsInternal() == 0) { Runtime.trap("No seats available") };
    if (isEmailRegisteredInternal(email)) { Runtime.trap("Email already registered") };
    let currentRegistrations = registrations;
    let registration : Registration = {
      name;
      email;
      phone;
      country;
      confirmed = true;
    };
    currentRegistrations.add(email, registration);
    Runtime.trap("success");
  };

  func getRemainingSeatsInternal() : Nat {
    let remaining = maxSeats - registrations.size();
    if (remaining > 0) { remaining } else { 0 : Nat };
  };

  public query ({ caller }) func getRemainingSeats() : async Nat {
    getRemainingSeatsInternal();
  };

  func isEmailRegisteredInternal(email : Text) : Bool {
    registrations.containsKey(email);
  };

  public query ({ caller }) func isEmailRegistered(email : Text) : async Bool {
    isEmailRegisteredInternal(email);
  };

  public shared ({ caller }) func getAllRegistrations() : async [Registration] {
    registrations.values().toArray().sort();
  };
};
