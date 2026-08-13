import database from "infra/database.js";

//request -> o que vem de fora
// response -> o que mandamos pra fora
async function status(request, response) {
  const databaseName = process.env.POSTGRES_DB;

  const version = await database.query("SHOW server_version;");

  const updatedAt = new Date().toISOString();
  const maxConnections = await database.query("SHOW max_connections;");
  // const activeConnections = await database.query(
  //   "Select count(*) FROM pg_stat_activity where state = 'active';",
  // );

  // const dataBseConnectionResult = await database.query(
  //   `Select count(*)::int from pg_stat_activity where datname ='${databaseName}'`,
  // );

  const dataBseConnectionResult = await database.query({
    text: "Select count(*)::int from pg_stat_activity where datname =$1",
    values: [databaseName],
  });

  const proprieties = {
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: version.rows[0].server_version,
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        // active_connections: parseInt(activeConnections.rows[0].count),
        active_connections: dataBseConnectionResult.rows[0].count,
      },
    },
    // postgres_version: version.rows[0].version,
    // active_connections: parseInt(activeConnections.rows[0].count),
  };
  response.status(200).json(proprieties);
}

export default status;
