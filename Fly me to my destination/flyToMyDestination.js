/**
 * Finds the minimum number of planes needed to reach the last airport.
 *
 * @param {number[]} fuelArray - Array of fuel units available in planes at each airport
 * @returns {number} - Minimum number of planes needed or -1 if impossible
 */
function minPlanesToReachDestination(fuelArray) {
  const n = fuelArray.length;

  // Edge case: If there's only one airport, we're already there
  if (n === 1) return 0;

  // Use an array to track the minimum number of planes needed to reach each airport
  // Initialize with Infinity to represent "not yet reached"
  const minPlanes = Array(n).fill(Infinity);
  minPlanes[0] = 0; // Starting point requires 0 planes initially

  // For each airport
  for (let current = 0; current < n - 1; current++) {
    // If current airport is unreachable, skip it
    if (minPlanes[current] === Infinity) continue;

    const fuel = fuelArray[current];

    // Try all possible jumps from current airport based on available fuel
    for (let jump = 1; jump <= fuel && current + jump < n; jump++) {
      const nextAirport = current + jump;

      // If we find a better path (fewer planes), update it
      // If we reach a new airport, we need to hire the plane at current airport
      minPlanes[nextAirport] = Math.min(
        minPlanes[nextAirport],
        minPlanes[current] + 1
      );
    }
  }

  // Return the minimum planes needed to reach the last airport
  // If it's still Infinity, it means the destination is unreachable
  return minPlanes[n - 1] === Infinity ? -1 : minPlanes[n - 1];
}

// Test cases
console.log("Test Case 1:");
console.log("Fuel array: [2, 1, 2, 3, 1]");
console.log(
  "Minimum planes needed: " + minPlanesToReachDestination([2, 1, 2, 3, 1])
);
// Expected output: 2

console.log("\nTest Case 2:");
console.log("Fuel array: [1, 6, 3, 4, 5, 0, 0, 0, 6]");
console.log(
  "Minimum planes needed: " +
    minPlanesToReachDestination([1, 6, 3, 4, 5, 0, 0, 0, 6])
);
// Expected output: 3

console.log("\nTest Case 3 - Unreachable:");
console.log("Fuel array: [1, 0, 0, 0, 0]");
console.log(
  "Minimum planes needed: " + minPlanesToReachDestination([1, 0, 0, 0, 0])
);
// Expected output: -1

console.log("\nTest Case 4 - Single airport:");
console.log("Fuel array: [0]");
console.log("Minimum planes needed: " + minPlanesToReachDestination([0]));
// Expected output: 0
