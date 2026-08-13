// test("GET to /api/v1/status should return status proprieties", async () => {
//   const response = await fetch("http://localhost:3000/api/v1/status");

//   const responseBody = await response.json();
//   const convertedDate = new Date(responseBody.updated_at).toISOString();
//   console.log(responseBody);

//   expect(responseBody.updated_at).toEqual(convertedDate);
//   // expect(responseBody.postgres_version).toBeDefined();
//   // expect(responseBody.max_connections).toBeDefined();
//   // expect(responseBody.active_connections).toBeDefined();
// });
test("GET to /api/v1/status should return status proprieties", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");

  const responseBody = await response.json();
  const convertedDate = new Date(responseBody.updated_at).toISOString();
  console.log(responseBody);

  expect(response.status).toBe(200);

  expect(responseBody.updated_at).toEqual(convertedDate);
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  expect(responseBody.dependencies.database.active_connections).toEqual(1);
});

test("Teste de SQL INJECTION", async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName=local_db",
  );
});
