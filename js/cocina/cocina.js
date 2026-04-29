const config_firebase = {
  apiKey: "API_KEY",
  authDomain: "AUTH_DOMAIN",
  databaseURL: "DATABASE_URL",
  projectId: "PROJECT_ID",
  storageBucket: "STORAGE_BUCKET",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
}

if (!firebase.apps.length) {
  firebase.initializeApp(config_firebase)
}

const auth_app = firebase.auth()
const db_app = firebase.database()
const form_alerta = document.getElementById("form-alerta")
const estado_cocina = document.getElementById("estado-cocina")
const btn_salir = document.getElementById("btn-salir")

form_alerta.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const mozo_id = document.getElementById("mozo-id").value.trim()
  const alerta_txt = document.getElementById("alerta-txt").value.trim()
  const alerta_id = crypto.randomUUID()
  const fecha_ms = Date.now()

  try {
    await db_app.ref(`alertas/${mozo_id}/${alerta_id}`).set({ alerta_txt, fecha_ms, estado_txt: "pendiente" })
    estado_cocina.textContent = "Alerta enviada"
    form_alerta.reset()
  } catch (err_app) {
    estado_cocina.textContent = "No se pudo enviar"
  }
})

btn_salir.addEventListener("click", async () => {
  await auth_app.signOut()
  window.location.href = "../index.html"
})
