import database from "infra/database.js";

//request -> o que vem de fora
// response -> o que mandamos pra fora
async function status(request, response) {
  const result = await database.query("SELECT 1 + 1 as sum;");
  console.log(result.rows);
  response.status(200).json({ chave: "Acima da média" });
}

export default status;
