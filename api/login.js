export default async function handler(req, res) {
  try {
    const { email, contrasena } = req.query;

    if (!email || !contrasena) {
      return res.status(400).json({ success: false, message: 'Faltan credenciales' });
    }

    const url = `https://script.google.com/macros/s/AKfycbz5FKxVzXXp6FAfYD646HDODi2vQkMu9Lg5sX-N3HSDQbBZ3L9Nkkk4omqqwuFy__UY/exec?email=${encodeURIComponent(email)}&contrasena=${encodeURIComponent(contrasena)}`;

 const response = await fetch(url);
    const text = await response.text();
    
    return res.status(response.status).send(text);

    // Intentá parsear JSON solo si la respuesta es JSON válida
    try {
      const data = JSON.parse(text);
      return res.status(200).json(data);
    } catch (parseError) {
      console.error('No es JSON válido:', parseError);
      return res.status(500).json({ success: false, message: 'Respuesta inválida del servidor externo' });
    }

  } catch (error) {
    console.error('Error atrapado en catch:', error);
    return res.status(500).json({ success: false, message: 'Error interno en servidor' });
  }
}
