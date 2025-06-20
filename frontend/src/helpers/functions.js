export function formatDate(fechaISO) {
  const fecha = new Date(fechaISO);

  if (isNaN(fecha.getTime())) {
    throw new Error("Fecha inválida");
  }

  const dia = String(fecha.getDate()).padStart(2, "0");
  const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Los meses empiezan desde 0
  const año = fecha.getFullYear();

  const horas = String(fecha.getHours()).padStart(2, "0");
  const minutos = String(fecha.getMinutes()).padStart(2, "0");
  const segundos = String(fecha.getSeconds()).padStart(2, "0");

  return `${dia}-${mes}-${año} a las ${horas}:${minutos}:${segundos}`;
}

