import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import decode from 'jwt-decode';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: () => import('../page/secure/Login.vue'),
    meta: { layout: 'login', requiresAuth: true }
  },
  {
    path: '/usuarios',
    name: 'Usuario',
    component: () => import('../page/usuario/Usuario.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/frmusuario',
    name: 'frmUsuario',
    component: () => import('../page/usuario/frmUsuario.vue'),
    meta: { layout: 'public', requiresAuth: true }
  },

  {
    path: '/frmactivar',
    name: 'frmactivar',
    component: () => import('../page/usuario/frmActivar.vue'),
    meta: { layout: 'public', requiresAuth: true }
  },

  {
    path: '/frmrecuperarcuenta',
    name: 'frmrecuperarcuenta',
    component: () => import('../page/usuario/frmRecuperarCuenta.vue'),
    meta: { layout: 'public', requiresAuth: true }
  },


  {
    path: '/frmactualizar',
    name: 'frmactualizar',
    component: () => import('../page/usuario/frmActualizar.vue'),
    meta: { layout: 'public', requiresAuth: true }
  },


  {
    path: '/home',
    name: 'home',
    component: () => import("@/components/Home.vue"),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/about_me',
    name: 'about_me',
    component: () => import("@/informacionpersona/pages/AboutMe.vue"),
    meta: { layout: 'default', requiresAuth: true }
  },

  {
    path: '/categories',
    name: 'categories',
    component: () => import("@/page/categories/Categories.vue"),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/roles',
    name: 'roles',
    component: () => import("@/page/roles/Roles.vue"),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: () => import("@/page/suppliers/Suppliers.vue"),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/persona',
    name: 'Persona',
    component: () => import("@/inicio/pages/DatosPersonales.vue"),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/tramites',
    name: 'Tramites',
    component: () => import('@/inicio/pages/Tramites.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/requisitos',
    name: 'Requisitos',
    component: () => import('@/inicio/pages/Requisitos.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/datosadicionales',
    name: 'datosadicionales',
    component: () => import('@/inicio/pages/DatosAdicionales.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/documentos',
    name: 'Documentos',
    component: () => import('@/inicio/pages/Documentos.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/subirdocumentos',
    name: 'SubirDocumentos',
    component: () => import('@/inicio/pages/SubirDocumentos.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/subirdocumentosP',
    name: 'SubirDocumentosP',
    component: () => import('@/inicio/pages/SubirDocumentosPas.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/ConRelacion',
    name: 'ConRelacion',
    component: () => import('@/inicio/pages/extranjeria/ConRelacion.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/SinRelacion',
    name: 'SinRelacion',
    component: () => import('@/inicio/pages/extranjeria/SinRelacion.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  {
    path: '/OtroIngreso',
    name: 'OtroIngreso',
    component: () => import('@/inicio/pages/extranjeria/OtroIngreso.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },  
  {
    path: '/datosConyugue',
    name: 'datosConyugue',
    component: () => import('@/inicio/pages/extranjeria/datosConyugue.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  
  
  {
    path: '/notificaciones',
    name: 'Notificaciones',
    component: () => import('@/notificaciones/pages/Notificaciones.vue'),
    meta: { layout: 'default', requiresAuth: true }
  },
  // {
  //   path: '/seguimientolista',
  //   name: 'seguimientolista',
  //   component: () => import("@/seguimiento/pages/SeguimientoLista.vue"),
  //   meta: { layout: 'default', requiresAuth: true }
  // },

  {
    path: "/:catchAll(.*)",
    component: () => import('../components/layout/PageNotFound.vue')
  },
 
  // {
  //   path: '/archivolista',
  //   name: 'ArchivoLista',
  //   component: () => import('@/archivo/page/ArchivoLista.vue'),
  //   meta: { layout: 'default', requiresAuth: true }
  // },
  // {
  //   path: '/archivo',
  //   name: 'Archivo',
  //   component: () => import('@/archivo/page/Archivo.vue'),
  //   meta: { layout: 'default', requiresAuth: true }
  // },


]

//console.log('base_url: ',VUE_APP_BASE_URL);
const router = createRouter({
  //history: createWebHistory(process.env.BASE_URL),
  history: createWebHashHistory(`${process.env.VUE_APP_BASE_URL}`),
  //history: createWebHashHistory(process.env.BASE_URL),
  routes,
})



export default router;
