async function test() {
  // Test 1: simple POST to reservation API
  try {
    const res = await fetch("http://localhost:3001/api/reservation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "room", firstName: "Jean", lastName: "Test",
        email: "test@test.com", phone: "243997721582",
        countryOfOrigin: "RDC", nationality: "Congolaise",
        idDocument: "PASS12345", cityOfProvenance: "Goma",
        stayPurpose: "Vacances", paymentMode: "private",
        checkin: "2026-06-01", checkout: "2026-06-03",
        guests: 2, roomType: "1", message: "",
        acceptTerms: true, lang: "fr",
        fullname: "Jean Test",
      }),
    });
    console.log("=== Reservation POST ===");
    console.log("Status:", res.status);
    const text = await res.text();
    console.log("Response:", text.substring(0, 1000));
  } catch (e) {
    console.error("Reservation Error:", e.message);
  }

  // Test 2: check if Prisma can even query
  try {
    const res2 = await fetch("http://localhost:3001/api/reservation?roomType=1&checkin=2026-06-01&checkout=2026-06-03");
    console.log("=== Reservation GET (availability) ===");
    console.log("Status:", res2.status);
    const text2 = await res2.text();
    console.log("Response:", text2.substring(0, 500));
  } catch (e2) {
    console.error("GET Error:", e2.message);
  }
}
test();
