# 🏦 Homebanking para Adultos Mayores

## 📌 Descripción del Proyecto

Este proyecto consiste en una aplicación de Homebanking full stack diseñada específicamente para adultos mayores, con el objetivo de facilitar el acceso a servicios bancarios digitales mediante una experiencia simple, clara y accesible.

A diferencia de los sistemas tradicionales, este enfoque prioriza la usabilidad por sobre la complejidad, reduciendo fricción, errores y confusión en usuarios con menor familiaridad tecnológica.

---

## 🌐 Deploy

Podés probar la aplicación en el siguiente link:

👉 https://homebankingadultosmayores.netlify.app/

---

## 🧪 Datos de prueba

Para acceder rápidamente:

- **DNI:** 301234156  
- **Contraseña:** 123456  

---

## 🎯 Objetivo

Brindar una plataforma bancaria digital que:

- Sea fácil de usar  
- Minimice errores del usuario  
- Reduzca la sobrecarga cognitiva  
- Mejore la accesibilidad  

---

## 🧠 Enfoque de Diseño (UX/UI)

El sistema fue desarrollado bajo principios centrados en adultos mayores:

- Diseño **mobile-first**  
- Interfaces limpias y sin distracciones  
- Navegación simple y directa  
- Uso de botones grandes y claros  
- Eliminación de modales nativos del navegador (alerts/prompts)  
- Feedback visual claro ante cada acción  

---

## 🏗️ Arquitectura del Proyecto

El proyecto está estructurado como un monorepo:

/homebanking
/backend
/frontend


---

### 🔧 Backend

**Tecnologías:**

- Node.js  
- Express.js  
- MongoDB (Atlas)  

**Responsabilidades:**

- Gestión de usuarios  
- Manejo de cuentas bancarias  
- Lógica de tarjetas (crédito y débito)  
- Registro de transacciones  
- Cálculo de balances  

**Funcionalidades principales:**

- Compras con tarjeta de crédito y débito  
- Actualización de saldo en tiempo real  
- Cálculo de límite disponible  
- Persistencia de movimientos  

---

### 💻 Frontend

**Tecnologías:**

- React  
- TypeScript  
- Vite  
- Tailwind CSS  

**Estructura:**

src/
Components/
Pages/
Hooks/
Context/
Routes/
Types/
Utils/


**Patrón de arquitectura:**

- **Pages**: Contenedores principales  
- **Components**: Componentes presentacionales  
- **Hooks**: Manejo de lógica y consumo de API  

---

## 📱 Vistas Principales

### 🏠 Dashboard

- Muestra cuenta principal  
- Alias y CBU  
- Tarjeta de débito asociada  
- Acceso rápido a funcionalidades  

---

### 💳 Tarjetas

- Listado de tarjetas  
- Filtro por tipo (crédito/débito)  
- Acceso a detalle  

---

### 🔍 Detalle de Tarjeta

- Información completa  
- Movimientos  
- Pagos  
- Estado de la tarjeta  

---

### 🏦 Cuentas

- Listado de cuentas  
- Información básica  

---

### 📄 Detalle de Cuenta

- Alias editable  
- Eliminación de cuenta  
- Movimientos  

---

## 🔄 Flujo de Datos

1. El usuario interactúa con la UI  
2. Los Hooks realizan llamadas a la API  
3. El Backend procesa la lógica  
4. MongoDB persiste los datos  
5. El Frontend se actualiza mediante refetch  

---

## ⚙️ Funcionalidades Clave

- Visualización de saldo  
- Gestión de tarjetas  
- Compras con tarjeta  
- Edición de alias  
- Eliminación de cuentas  
- Feedback visual en acciones  

---

## 🧩 Componentes Importantes

### AccountCard
Muestra información de la cuenta principal y permite navegar al detalle.

### DebitCardPreview
Vista simplificada de la tarjeta de débito activa.

### AliasCard
Permite visualizar y editar el alias de la cuenta.

### CardItem
Representa una tarjeta dentro de un listado.

### CardDetail
Muestra información completa de una tarjeta.

---

## 🧪 Estado del Proyecto

✔ Backend funcional  
✔ Frontend completo  
✔ Integración exitosa  
✔ UX optimizada  

---

## 🧠 Decisiones Técnicas

- **React + Hooks**: Separación clara entre lógica y presentación  
- **TypeScript**: Mayor robustez y prevención de errores  
- **Monorepo**: Organización centralizada  
- **MongoDB**: Flexibilidad en modelado de datos  
- **Tailwind CSS**: Desarrollo rápido y consistente  

---

## ⚠️ Problemas Reales y Soluciones

**Mismatch entre ObjectId y string**
- Problema: consultas vacías  
- Solución: normalización de tipos  

**Estados null en frontend**
- Problema: render incorrecto  
- Solución: validaciones defensivas  

**Sincronización backend/frontend**
- Problema: datos desactualizados  
- Solución: refetch automático  

**Errores en propiedades**
- Problema: inconsistencias  
- Solución: tipado y corrección backend  

---

## ▶️ Cómo Ejecutar el Proyecto

### Backend

bash
cd backend
npm install
npm run dev

cd frontend
npm install
npm run dev
---
## 🚀 Posibles Mejoras Futuras

- Transferencias entre cuentas  
- Pagos de servicios  
- Autenticación avanzada  
- Notificaciones  

---

## 👨‍💻 Autor

Proyecto desarrollado íntegramente por **Ignacio Rojos** como práctica profesional enfocada en desarrollo full stack y experiencia de usuario.

---

## 📌 Conclusión

Este proyecto demuestra cómo una correcta combinación de tecnología, arquitectura y diseño centrado en el usuario puede generar soluciones accesibles e inclusivas en el ámbito financiero digital.

---

## 🏁 Propiedad del Proyecto

Este proyecto fue diseñado y desarrollado completamente por el autor, abarcando frontend, backend, arquitectura, lógica de negocio y experiencia de usuario.
