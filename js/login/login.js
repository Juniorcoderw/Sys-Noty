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
const form_login = document.getElementById("form-login")
const estado_login = document.getElementById("estado-login")

form_login.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const correo_txt = document.getElementById("correo-login").value.trim()
  const clave_txt = document.getElementById("clave-login").value.trim()

  try {
    const sesion_usr = await auth_app.signInWithEmailAndPassword(correo_txt, clave_txt)
    const uid_usr = sesion_usr.user.uid
    const rol_ref = await db_app.ref(`usuarios/${uid_usr}/rol`).get()
    const rol_txt = rol_ref.val()

    if (rol_txt === "admin") window.location.href = "pantallas/admin.html"
    if (rol_txt === "cocina" || rol_txt === "barra" || rol_txt === "caja") window.location.href = "pantallas/cocina.html"
    if (rol_txt === "mozo") window.location.href = "pantallas/mozo.html"
  } catch (err_app) {
    estado_login.textContent = "No se pudo iniciar sesión"
  }
})
