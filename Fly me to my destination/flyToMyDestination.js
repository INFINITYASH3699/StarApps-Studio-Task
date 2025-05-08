function minPlanesToReachDestination(fuelArray) {
  const n = fuelArray.length;

  // If there's only one airport, no planes are needed — you're already there
  if (n === 1) return 0;

  // This array keeps track of the fewest planes needed to reach each airport
  const minPlanes = Array(n).fill(Infinity);
  minPlanes[0] = 0; // Starting point — no planes needed to be here

  for (let current = 0; current < n - 1; current++) {
    // Skip airports we can't reach
    if (minPlanes[current] === Infinity) continue;

    const fuel = fuelArray[current];

    // Check how far we can fly from the current airport
    for (let jump = 1; jump <= fuel && current + jump < n; jump++) {
      const next = current + jump;

      // Update the minimum number of planes needed to reach the next airport
      minPlanes[next] = Math.min(minPlanes[next], minPlanes[current] + 1);
    }
  }

  // If we never reached the last airport, return -1
  return minPlanes[n - 1] === Infinity ? -1 : minPlanes[n - 1];
}

// Sample test runs

console.log("Test Case 1:");
console.log("Fuel array: [2, 1, 2, 3, 1]");
console.log("Minimum planes needed:", minPlanesToReachDestination([2, 1, 2, 3, 1]));
// Output: 2

console.log("\nTest Case 2:");
console.log("Fuel array: [1, 6, 3, 4, 5, 0, 0, 0, 6]");
console.log("Minimum planes needed:", minPlanesToReachDestination([1, 6, 3, 4, 5, 0, 0, 0, 6]));
// Output: 3

console.log("\nTest Case 3:");
console.log("Fuel array: [1, 0, 0, 0, 0]");
console.log("Minimum planes needed:", minPlanesToReachDestination([1, 0, 0, 0, 0]));
// Output: -1

console.log("\nTest Case 4:");
console.log("Fuel array: [0]");
console.log("Minimum planes needed:", minPlanesToReachDestination([0]));
// Output: 0
