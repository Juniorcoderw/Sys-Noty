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
const form_usr = document.getElementById("form-usuario")
const estado_admin = document.getElementById("estado-admin")
const btn_salir = document.getElementById("btn-salir")

form_usr.addEventListener("submit", async (evt) => {
  evt.preventDefault()
  const nombre_usr = document.getElementById("nombre-usr").value.trim()
  const correo_usr = document.getElementById("correo-usr").value.trim()
  const rol_usr = document.getElementById("rol-usr").value
  const clave_usr = "NotiFast123"

  try {
    const nuevo_usr = await auth_app.createUserWithEmailAndPassword(correo_usr, clave_usr)
    const uid_usr = nuevo_usr.user.uid
    const datos_usr = { nombre_usr, correo_usr, rol_usr }
    await db_app.ref(`usuarios/${uid_usr}`).set(datos_usr)
    estado_admin.textContent = "Usuario creado"
    form_usr.reset()
  } catch (err_app) {
    estado_admin.textContent = "No se pudo crear usuario"
  }
})

btn_salir.addEventListener("click", async () => {
  await auth_app.signOut()
  window.location.href = "../index.html"
})
