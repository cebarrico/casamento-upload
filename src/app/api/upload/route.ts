export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const nome = String(formData.get("nome") || "");
    const mensagem = String(formData.get("mensagem") || "");

    const files = formData.getAll("arquivos") as File[];

    const resultados = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();

      const base64 = Buffer.from(buffer).toString("base64");

      const response = await fetch(process.env.APPS_SCRIPT_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome,
          mensagem,
          file: base64,
          fileName: file.name,
          mimeType: file.type,
        }),
      });

      resultados.push(await response.text());
    }

    return Response.json({
      success: true,
      enviados: resultados.length,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
      },
      {
        status: 500,
      },
    );
  }
}
