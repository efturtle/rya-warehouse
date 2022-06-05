"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["HerramientasIndex"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Herramientas.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Herramientas.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var v_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! v-svg-icons */ "./node_modules/v-svg-icons/icons.vue");

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    icons: v_svg_icons__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  data: function data() {
    return {
      herramientas: [],
      user: [],
      mensaje_de_error: '',
      quiereEditarHerramienta: false,
      quiereSumarInventario: false,
      quiereRestarInventario: false,
      activeEditHerramientaId: '',
      activeSumHerramientaId: '',
      activeRestaHerramientaId: '',
      form: {
        nombre: '',
        descripcion: ''
      },
      formInventario: {
        cantidad: 0
      }
    };
  },
  methods: {
    noQuiereEditarHerramienta: function noQuiereEditarHerramienta() {
      this.quiereEditarHerramienta = false;
    },
    noQuiereSumarInventario: function noQuiereSumarInventario() {
      this.quiereSumarInventario = false;
    },
    noQuiereRestarInventario: function noQuiereRestarInventario() {
      this.quiereRestarInventario = false;
    },
    getHerramienta: function getHerramienta(herramienta_id) {
      return this.herramientas.find(function (herramienta) {
        return herramienta.id == herramienta_id;
      });
    },
    sumarInventario: function sumarInventario(herramienta_id) {
      this.quiereSumarInventario = true;
      this.activeSumHerramientaId = herramienta_id;
    },
    confirmarYSumarInventario: function confirmarYSumarInventario() {
      var _this = this;

      var herramienta = this.getHerramienta(this.activeSumHerramientaId);

      if (this.formInventario.cantidad == '') {
        this.sweetAlertToast('campo vacio', 'Cantidad', 'warning');
        return;
      }

      if (this.formInventario.cantidad < 1) {
        this.sweetAlertToast('numero invalido', 'Ingrese una cantidad positiva', 'info');
        this.formInventario.cantidad = 0;
        return;
      }

      axios.patch("/api/v1/herramientas/sumar/".concat(herramienta.id), this.formInventario).then(function () {
        _this.sweetAlertToast('Exito', "Se le sumo a ".concat(herramienta.nombre), 'success'); // local herramienta inventario


        var inventario = parseInt(herramienta.inventario);
        herramienta.inventario = inventario += _this.formInventario.cantidad;
        _this.formInventario.cantidad = 0;
        document.querySelector('#cantidadInputParaSumar').focus(); // esconder modals

        _this.quiereSumarInventario = false;
      })["catch"](function (error) {
        _this.$swal('Error', error, 'error');
      });
    },
    restarInventario: function restarInventario(herramienta_id) {
      this.quiereRestarInventario = true;
      this.activeRestaHerramientaId = herramienta_id;
    },
    confirmarYRestarInventario: function confirmarYRestarInventario() {
      var _this2 = this;

      var herramienta = this.getHerramienta(this.activeRestaHerramientaId);
      var cantidad = this.formInventario.cantidad;

      if (cantidad == '') {
        this.sweetAlertToast('campo vacio', 'Cantidad', 'warning');
        return;
      }

      if (cantidad < 1) {
        this.formInventario.cantidad = Math.abs(cantidad);
      }

      if (cantidad > parseInt(herramienta.inventario)) {
        this.sweetAlertToast('inventario insuficiente', 'Se le quiere restar mas de lo que hay', 'info');
        this.formInventario.cantidad = 0;
        return;
      }

      axios.patch("/api/v1/herramientas/restar/".concat(herramienta.id), this.formInventario).then(function () {
        _this2.sweetAlertToast('Exito', "Se le resto a ".concat(herramienta.nombre), 'success'); // local herramienta inventario


        herramienta.inventario -= _this2.formInventario.cantidad;
        _this2.formInventario.cantidad = 0;
        document.querySelector('#cantidadInputParaRestar').focus(); // esconder modals

        _this2.quiereRestarInventario = false;
      })["catch"](function (error) {
        _this2.$swal('Error', error, 'error');
      });
    },
    editarHerramienta: function editarHerramienta(herramienta_id) {
      this.quiereEditarHerramienta = true;
      var herramienta = this.herramientas.find(function (herramienta) {
        return herramienta.id == herramienta_id;
      }); // fill in current tarea

      this.form.nombre = herramienta.nombre;
      this.form.descripcion = herramienta.descripcion;
      this.activeEditHerramientaId = herramienta.id;
    },
    confirmarYEditarHerramienta: function confirmarYEditarHerramienta() {
      var _this3 = this;

      // validate for null inputs
      if (this.form.nombre == '') {
        this.sweetAlertToast('campo vacio', 'Nombre', 'warning');
        return;
      }

      if (this.form.descripcion == '') {
        this.sweetAlertToast('campo vacio', 'Descripcion', 'warning');
        return;
      } // send the tarea to the backend


      axios.put("/api/v1/herramientas/".concat(this.activeEditHerramientaId), this.form).then(function () {
        _this3.sweetAlertToast('Exito', 'Herramienta Actualizada', 'success'); // actualiza las tarea


        var herramienta = _this3.getHerramienta(_this3.activeEditHerramientaId);

        herramienta.nombre = _this3.form.nombre;
        herramienta.descripcion = _this3.form.descripcion; // esconder modals

        _this3.quiereEditarHerramienta = false;
      })["catch"](function (error) {
        _this3.$swal('Error', error, 'error');
      });
    },
    eliminarHerramienta: function eliminarHerramienta(herramienta_id) {
      var _this4 = this;

      var herramienta = this.getHerramienta(herramienta_id);
      this.$swal({
        title: "Eliminar ".concat(herramienta.nombre, "? <br>inv. actual <span class=\"text-orange-300\"> ").concat(herramienta.inventario, " </span>"),
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/api/v1/herramientas/".concat(herramienta_id)).then(function () {
            _this4.sweetAlertToast('Exito', 'Se elimino una Herramienta', 'success');

            _this4.herramientas.splice(_this4.herramientas.findIndex(function (herramienta) {
              return herramienta.id == herramienta_id;
            }), 1);
          })["catch"](function (error) {
            _this4.sweetAlertToast('Error', error, 'error');
          });
        }
      });
    },
    getUserName: function getUserName(user_id) {
      var user = this.users.find(function (user) {
        return user.id == user_id;
      });
      return user.name;
    },
    sweetAlertToast: function sweetAlertToast(title, text, icon) {
      this.$swal({
        title: title,
        text: text,
        icon: icon,
        toast: true
      });
    }
  },
  mounted: function mounted() {
    var _this5 = this;

    // get the herramientas
    axios.get('api/v1/herramientas').then(function (data) {
      _this5.herramientas = data.data.herramientas;
    })["catch"](function (error) {
      _this5.mensaje_de_error = error;
    }); // get the user

    axios.get('/api/user').then(function (data) {
      _this5.user = data.data;
    });
  },
  computed: {
    admin: function admin() {
      if (this.user.puesto != 3) {
        return true;
      }

      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Herramientas.vue?vue&type=template&id=354b5fdc":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Herramientas.vue?vue&type=template&id=354b5fdc ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "overflow-hidden overflow-x-auto min-w-full align-middle sm:rounded-md"
};
var _hoisted_2 = {
  key: 0,
  "class": "flex place-content-end mb-4"
};
var _hoisted_3 = {
  "class": "px-4 py-2 text-white bg-orange-600 hover:bg-orange-700 cursor-pointer"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Crear Herramienta");

var _hoisted_5 = {
  "class": "table-fixed w-full border divide-y divide-gray-200"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs tracking-wider leading-4 text-left text-gray-500"
}, "Nombre")]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs tracking-wider leading-4 text-left text-gray-500"
}, "Sobre")]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs tracking-wider leading-4 text-left text-gray-500"
}, "Inv")]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs font-medium tracking-wider leading-4 text-left text-gray-500"
}, "Acciones")])])], -1
/* HOISTED */
);

var _hoisted_7 = {
  "class": "bg-white divide-y divide-gray-200 divide-solid"
};
var _hoisted_8 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_9 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_10 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_11 = {
  "class": "grid grid-cols-2 gap-4 justify-items-center px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_12 = ["onClick"];
var _hoisted_13 = ["onClick"];
var _hoisted_14 = ["onClick"];
var _hoisted_15 = ["onClick"];
var _hoisted_16 = {
  "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2"
};
var _hoisted_17 = {
  "class": "mt-5"
};
var _hoisted_18 = {
  key: 0,
  id: "defaultModal",
  tabindex: "-1",
  "class": "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
};
var _hoisted_19 = {
  "class": "bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700"
};
var _hoisted_20 = {
  "class": "bg-slate-50 relative bg-white rounded-lg"
};
var _hoisted_21 = {
  "class": "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
};

var _hoisted_22 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
  "class": "text-xl font-semibold text-gray-900 dark:text-white"
}, " Editar Herramienta ", -1
/* HOISTED */
);

var _hoisted_23 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "class": "w-5 h-5",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
})], -1
/* HOISTED */
);

var _hoisted_24 = [_hoisted_23];
var _hoisted_25 = {
  "class": "grid grid-cols-1 gap-4 place-items-center"
};

var _hoisted_26 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "nombre",
  "class": "block text-sm font-medium text-gray-700"
}, "Tarea", -1
/* HOISTED */
);

var _hoisted_27 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "descripcion",
  "class": "block text-sm font-medium text-gray-700"
}, "Descripcion", -1
/* HOISTED */
);

var _hoisted_28 = {
  "class": "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
};
var _hoisted_29 = {
  "class": "mt-5"
};
var _hoisted_30 = {
  key: 0,
  id: "defaultModal",
  tabindex: "-1",
  "class": "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
};
var _hoisted_31 = {
  "class": "bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700"
};
var _hoisted_32 = {
  "class": "bg-slate-50 relative bg-white rounded-lg"
};
var _hoisted_33 = {
  "class": "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
};

var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
  "class": "text-xl font-semibold text-gray-900 dark:text-white"
}, " Sumar inventario ", -1
/* HOISTED */
);

var _hoisted_35 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "class": "w-5 h-5",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
})], -1
/* HOISTED */
);

var _hoisted_36 = [_hoisted_35];
var _hoisted_37 = {
  "class": "grid grid-cols-1 gap-4 place-items-center"
};

var _hoisted_38 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "nombre",
  "class": "block text-sm font-medium text-gray-700"
}, "Cantidad a sumar", -1
/* HOISTED */
);

var _hoisted_39 = {
  "class": "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
};
var _hoisted_40 = {
  "class": "mt-5"
};
var _hoisted_41 = {
  key: 0,
  id: "defaultModal",
  tabindex: "-1",
  "class": "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
};
var _hoisted_42 = {
  "class": "bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700"
};
var _hoisted_43 = {
  "class": "bg-slate-50 relative bg-white rounded-lg"
};
var _hoisted_44 = {
  "class": "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
};

var _hoisted_45 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
  "class": "text-xl font-semibold text-gray-900 dark:text-white"
}, " Restar inventario ", -1
/* HOISTED */
);

var _hoisted_46 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  "class": "w-5 h-5",
  fill: "currentColor",
  viewBox: "0 0 20 20",
  xmlns: "http://www.w3.org/2000/svg"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "fill-rule": "evenodd",
  d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
  "clip-rule": "evenodd"
})], -1
/* HOISTED */
);

var _hoisted_47 = [_hoisted_46];
var _hoisted_48 = {
  "class": "grid grid-cols-1 gap-4 place-items-center"
};

var _hoisted_49 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "nombre",
  "class": "block text-sm font-medium text-gray-700"
}, "Cantidad a Restar", -1
/* HOISTED */
);

var _hoisted_50 = {
  "class": "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");

  var _component_icons = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("icons");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.guardReactiveProps)($data.mensaje_de_error)), null, 16
  /* FULL_PROPS */
  ), $options.admin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    to: {
      name: 'herramienta.create'
    },
    "class": "text-sm font-medium"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [_hoisted_4];
    }),
    _: 1
    /* STABLE */

  }, 8
  /* PROPS */
  , ["to"])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.herramientas, function (herramienta) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: herramienta.id,
      "class": "bg-white"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(herramienta.nombre), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(herramienta.descripcion.substring(0, 10)), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(herramienta.inventario), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2",
      onClick: function onClick($event) {
        return $options.editarHerramienta(herramienta.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "edit",
      width: "21px",
      height: "21px"
    })], 8
    /* PROPS */
    , _hoisted_12), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.admin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Delete "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2",
      onClick: function onClick($event) {
        return $options.eliminarHerramienta(herramienta.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "trash",
      width: "21px",
      height: "21px"
    })], 8
    /* PROPS */
    , _hoisted_13), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.admin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sumar inventario "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2",
      onClick: function onClick($event) {
        return $options.sumarInventario(herramienta.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "plus",
      width: "21px",
      height: "21px"
    })], 8
    /* PROPS */
    , _hoisted_14), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.admin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Restar inventario "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2",
      onClick: function onClick($event) {
        return $options.restarInventario(herramienta.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "minus",
      width: "21px",
      height: "21px"
    })], 8
    /* PROPS */
    , _hoisted_15), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.admin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Solicitar esta herramienta "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "shopping-cart",
      width: "20px",
      height: "20px"
    })], 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$options.admin]])])]);
  }), 128
  /* KEYED_FRAGMENT */
  ))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Editar Herramienta "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [$data.quiereEditarHerramienta ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [_hoisted_22, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.noQuiereEditarHerramienta && $options.noQuiereEditarHerramienta.apply($options, arguments);
    }),
    "class": "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  }, _hoisted_24)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_26, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.nombre = $event;
    }),
    id: "nombre",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.nombre]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_27, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.descripcion = $event;
    }),
    id: "descripcion",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.descripcion]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.confirmarYEditarHerramienta && $options.confirmarYEditarHerramienta.apply($options, arguments);
    }),
    "class": "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  }, "Cambiar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[4] || (_cache[4] = function () {
      return $options.noQuiereEditarHerramienta && $options.noQuiereEditarHerramienta.apply($options, arguments);
    }),
    "class": "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  }, "Cancelar")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Sumar inventario "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [$data.quiereSumarInventario ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_31, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[5] || (_cache[5] = function () {
      return $options.noQuiereSumarInventario && $options.noQuiereSumarInventario.apply($options, arguments);
    }),
    "class": "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  }, _hoisted_36)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_38, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
      return $data.formInventario.cantidad = $event;
    }),
    placeholder: "ingrese una cantidad",
    id: "cantidadInputParaSumar",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formInventario.cantidad]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[7] || (_cache[7] = function () {
      return $options.confirmarYSumarInventario && $options.confirmarYSumarInventario.apply($options, arguments);
    }),
    "class": "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  }, "Cambiar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[8] || (_cache[8] = function () {
      return $options.noQuiereSumarInventario && $options.noQuiereSumarInventario.apply($options, arguments);
    }),
    "class": "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  }, "Cancelar")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Restar inventario "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_40, [$data.quiereRestarInventario ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_41, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_42, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_44, [_hoisted_45, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[9] || (_cache[9] = function () {
      return $options.noQuiereRestarInventario && $options.noQuiereRestarInventario.apply($options, arguments);
    }),
    "class": "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  }, _hoisted_47)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_48, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "number",
    "onUpdate:modelValue": _cache[10] || (_cache[10] = function ($event) {
      return $data.formInventario.cantidad = $event;
    }),
    placeholder: "ingrese una cantidad",
    id: "cantidadInputParaRestar",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formInventario.cantidad]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_50, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[11] || (_cache[11] = function () {
      return $options.confirmarYRestarInventario && $options.confirmarYRestarInventario.apply($options, arguments);
    }),
    "class": "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  }, "Cambiar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[12] || (_cache[12] = function () {
      return $options.noQuiereRestarInventario && $options.noQuiereRestarInventario.apply($options, arguments);
    }),
    "class": "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  }, "Cancelar")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/views/Herramientas.vue":
/*!*********************************************!*\
  !*** ./resources/js/views/Herramientas.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Herramientas_vue_vue_type_template_id_354b5fdc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Herramientas.vue?vue&type=template&id=354b5fdc */ "./resources/js/views/Herramientas.vue?vue&type=template&id=354b5fdc");
/* harmony import */ var _Herramientas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Herramientas.vue?vue&type=script&lang=js */ "./resources/js/views/Herramientas.vue?vue&type=script&lang=js");
/* harmony import */ var _home_isellshoes_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_isellshoes_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Herramientas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Herramientas_vue_vue_type_template_id_354b5fdc__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/Herramientas.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/Herramientas.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Herramientas.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Herramientas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Herramientas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Herramientas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Herramientas.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/Herramientas.vue?vue&type=template&id=354b5fdc":
/*!***************************************************************************!*\
  !*** ./resources/js/views/Herramientas.vue?vue&type=template&id=354b5fdc ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Herramientas_vue_vue_type_template_id_354b5fdc__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Herramientas_vue_vue_type_template_id_354b5fdc__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Herramientas.vue?vue&type=template&id=354b5fdc */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Herramientas.vue?vue&type=template&id=354b5fdc");


/***/ })

}]);