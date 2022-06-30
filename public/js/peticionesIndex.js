"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["peticionesIndex"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Peticiones/PeticionItem.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Peticiones/PeticionItem.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: ['peticionItem']
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Peticiones/index.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Peticiones/index.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var v_svg_icons__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! v-svg-icons */ "./node_modules/v-svg-icons/icons.vue");
/* harmony import */ var _components_Peticiones_PeticionItem_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../components/Peticiones/PeticionItem.vue */ "./resources/js/components/Peticiones/PeticionItem.vue");


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    icons: v_svg_icons__WEBPACK_IMPORTED_MODULE_0__["default"],
    PeticionItem: _components_Peticiones_PeticionItem_vue__WEBPACK_IMPORTED_MODULE_1__["default"]
  },
  data: function data() {
    return {
      peticiones: [],
      user: [],
      mensaje_de_error: '',
      solicitador: '',
      quiereAceptarUnaPeticion: false,
      quiereRechazarUnaPeticion: false,
      activelyAcceptingPeticionId: 0,
      activelyRejectingPeticionId: 0,
      peticionItemsArray: [],
      form: {
        peticionItemsArray: [],
        peticion_id: ''
      },
      formRechazar: {
        comentario: ''
      }
    };
  },
  mounted: function mounted() {
    var _this = this;

    // get the herramientas
    axios.get('api/v1/peticiones').then(function (data) {
      _this.peticiones = data.data.peticiones;
    })["catch"](function (error) {
      _this.mensaje_de_error = error;
    }); // get the user

    axios.get('/api/user').then(function (data) {
      _this.user = data.data;
    });
  },
  methods: {
    isAccepted: function isAccepted(peticionStatus) {
      if (peticionStatus == 2) {
        return true;
      }

      return false;
    },
    isReturned: function isReturned(peticionStatus) {
      if (peticionStatus == 4) {
        return true;
      }

      return false;
    },
    isRejected: function isRejected(peticionStatus) {
      if (peticionStatus == 3) {
        return true;
      }

      return false;
    },
    datosSolicitador: function datosSolicitador(id) {
      var _this2 = this;

      axios.get("/api/v1/users/".concat(id)).then(function (data) {
        _this2.solicitador = data.data.user;
      })["catch"](function (error) {
        _this2.mensaje_de_error = error;
      });
    },
    aceptarEstaPeticion: function aceptarEstaPeticion(peticion_id) {
      var _this3 = this;

      this.activelyAcceptingPeticionId = peticion_id;
      this.quiereAceptarUnaPeticion = true;
      axios.get("/api/v1/peticiones/peticion-items/".concat(peticion_id)).then(function (response) {
        _this3.peticionItemsArray = response.data.peticionItems;
        _this3.form.peticionItemsArray = response.data.peticionItems;
        _this3.form.peticion_id = peticion_id;
      });
    },
    rechazarPeticion: function rechazarPeticion(peticion_id) {
      this.quiereRechazarUnaPeticion = true;
      this.activelyRejectingPeticionId = peticion_id;
    },
    noQuiereRechazarUnaPeticion: function noQuiereRechazarUnaPeticion() {
      this.quiereRechazarUnaPeticion = false;
    },
    noQuiereAceptarUnaPeticion: function noQuiereAceptarUnaPeticion() {
      this.quiereAceptarUnaPeticion = false;
      this.peticionItemsArray = [];
    },
    confirmarYAceptarPeticion: function confirmarYAceptarPeticion() {
      var _this4 = this;

      axios.patch("/api/v1/peticiones/aceptar/".concat(this.activelyAcceptingPeticionId), this.form).then(function (response) {
        _this4.sweetAlertToast('Exito', 'Se acepto la peticion', 'success');

        _this4.quiereAceptarUnaPeticion = false;
        _this4.peticionItemsArray = [];

        _this4.$router.push({
          name: 'herramientas.index'
        });
      })["catch"](function (error) {
        _this4.sweetAlertToast('Error', error, 'error');
      });
    },
    confirmarYRechazarPeticion: function confirmarYRechazarPeticion() {
      var _this5 = this;

      axios.patch("/api/v1/peticiones/rechazar/".concat(this.activelyRejectingPeticionId), this.formRechazar).then(function () {
        _this5.sweetAlertToast('Exito', 'Se rechazo la peticion', 'success');

        _this5.quiereRechazarUnaPeticion = false;

        _this5.$router.push({
          name: 'herramientas.index'
        });
      });
    },
    devolverHerramientas: function devolverHerramientas(peticion_id) {
      var _this6 = this;

      this.$swal({
        title: 'DevolverHerramientas?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(function (result) {
        if (result.value) {
          axios.patch("/api/v1/peticiones/regresar/".concat(peticion_id)).then(function () {
            _this6.sweetAlertToast('Exito', 'Se regresaron herramientas', 'success');

            _this6.$router.push({
              name: 'herramientas.index'
            });
          })["catch"](function (error) {
            _this6.sweetAlertToast('Error', error, 'error');
          });
        }
      });
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
  computed: {
    admin: function admin() {
      if (this.user.puesto != 3) {
        return true;
      }

      return false;
    },
    peticionItems: function peticionItems() {
      return this.peticionItemsArray;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Peticiones/PeticionItem.vue?vue&type=template&id=21963d19":
/*!*********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Peticiones/PeticionItem.vue?vue&type=template&id=21963d19 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.esm-bundler.js");

var _hoisted_1 = {
  "class": "bg-white shadow-xl"
};
var _hoisted_2 = {
  "class": "py-2 px-auto sm:px-6"
};
var _hoisted_3 = {
  "class": "mt-2"
};
var _hoisted_4 = {
  "class": "my-1"
};
var _hoisted_5 = {
  "class": "py-6"
};
var _hoisted_6 = {
  "class": "ml-4"
};
var _hoisted_7 = {
  "class": "text-lg font-medium text-gray-900",
  href: "#"
};
var _hoisted_8 = {
  "class": "text-gray-500"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ul", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("li", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", _hoisted_7, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.peticionItem.nombre), 1
  /* TEXT */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("p", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.peticionItem.cantidad), 1
  /* TEXT */
  )])])])])])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Peticiones/index.vue?vue&type=template&id=b9b47582":
/*!*********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Peticiones/index.vue?vue&type=template&id=b9b47582 ***!
  \*********************************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "table-fixed w-full border divide-y divide-gray-200"
};

var _hoisted_3 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs tracking-wider leading-4 text-left text-gray-500"
}, "Usuario")], -1
/* HOISTED */
);

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs tracking-wider leading-4 text-left text-gray-500"
}, "Cantidad")], -1
/* HOISTED */
);

var _hoisted_5 = {
  key: 0,
  "class": "px-6 py-3 bg-gray-50"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs tracking-wider leading-4 text-left text-gray-500"
}, "Acciones", -1
/* HOISTED */
);

var _hoisted_7 = [_hoisted_6];
var _hoisted_8 = {
  "class": "bg-white divide-y divide-gray-200 divide-solid"
};
var _hoisted_9 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_10 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_11 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_12 = ["onClick"];
var _hoisted_13 = ["onClick"];
var _hoisted_14 = ["onClick"];
var _hoisted_15 = {
  "class": "mt-5"
};
var _hoisted_16 = {
  key: 0,
  id: "defaultModal",
  tabindex: "-1",
  "class": "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
};
var _hoisted_17 = {
  "class": "bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700"
};
var _hoisted_18 = {
  "class": "bg-slate-50 relative bg-white rounded-lg"
};
var _hoisted_19 = {
  "class": "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
};

var _hoisted_20 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
  "class": "text-xl font-semibold text-gray-900 dark:text-white"
}, " Aceptar Una Peticion ", -1
/* HOISTED */
);

var _hoisted_21 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
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

var _hoisted_22 = [_hoisted_21];
var _hoisted_23 = {
  "class": "grid grid-cols-1 gap-4 place-items-center"
};
var _hoisted_24 = {
  "class": "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
};
var _hoisted_25 = {
  "class": "mt-5"
};
var _hoisted_26 = {
  key: 0,
  id: "defaultModal",
  tabindex: "-1",
  "class": "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
};
var _hoisted_27 = {
  "class": "bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700"
};
var _hoisted_28 = {
  "class": "bg-slate-50 relative bg-white rounded-lg"
};
var _hoisted_29 = {
  "class": "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
};

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
  "class": "text-xl font-semibold text-gray-900 dark:text-white"
}, " Rechazar Una Peticion ", -1
/* HOISTED */
);

var _hoisted_31 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
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

var _hoisted_32 = [_hoisted_31];
var _hoisted_33 = {
  "class": "grid grid-cols-1 gap-4 place-items-center"
};

var _hoisted_34 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "rechazo",
  "class": "block text-sm font-medium text-gray-700"
}, "Motivo de Rechazo", -1
/* HOISTED */
);

var _hoisted_35 = {
  "class": "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_icons = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("icons");

  var _component_PeticionItem = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("PeticionItem");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeProps)((0,vue__WEBPACK_IMPORTED_MODULE_0__.guardReactiveProps)($data.mensaje_de_error)), null, 16
  /* FULL_PROPS */
  ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [_hoisted_3, _hoisted_4, $options.admin ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("th", _hoisted_5, _hoisted_7)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", _hoisted_8, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.peticiones, function (peticion) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: peticion.id,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([$options.isAccepted(peticion.estatus) ? 'bg-green-300' : 'bg-white'])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(peticion.name), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(peticion.total_herramientas_en_peticion), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", null, " Devultas ", 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isReturned(peticion.estatus)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", {
      "class": "bg-red-300"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(peticion.comentario), 513
    /* TEXT, NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isRejected(peticion.estatus)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_11, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.aceptarEstaPeticion(peticion.id);
      },
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "check",
      width: "35px",
      height: "35px"
    })], 8
    /* PROPS */
    , _hoisted_12), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$options.isAccepted(peticion.estatus)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.devolverHerramientas(peticion.id);
      },
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "redo-alt",
      width: "35px",
      height: "35px"
    })], 8
    /* PROPS */
    , _hoisted_13), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isAccepted(peticion.estatus) && !$options.isReturned(peticion.estatus)]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      onClick: function onClick($event) {
        return $options.rechazarPeticion(peticion.id);
      },
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "times",
      width: "35px",
      height: "35px"
    })], 8
    /* PROPS */
    , _hoisted_14), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$options.isAccepted(peticion.estatus)]])], 512
    /* NEED_PATCH */
    ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$options.isReturned(peticion.estatus) && !$options.isRejected(peticion.estatus)]])], 2
    /* CLASS */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" aceptar peticion "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_15, [$data.quiereAceptarUnaPeticion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [_hoisted_20, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.noQuiereAceptarUnaPeticion && $options.noQuiereAceptarUnaPeticion.apply($options, arguments);
    }),
    "class": "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  }, _hoisted_22)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.peticionItems, function (peticionItem) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_PeticionItem, {
      key: peticionItem.id,
      peticionItem: peticionItem
    }, null, 8
    /* PROPS */
    , ["peticionItem"]);
  }), 128
  /* KEYED_FRAGMENT */
  ))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.confirmarYAceptarPeticion && $options.confirmarYAceptarPeticion.apply($options, arguments);
    }),
    "class": "text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
  }, "Aceptar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.noQuiereAceptarUnaPeticion && $options.noQuiereAceptarUnaPeticion.apply($options, arguments);
    }),
    "class": "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  }, "Cancelar")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" rechazar peticion "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [$data.quiereRechazarUnaPeticion ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [_hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[3] || (_cache[3] = function () {
      return $options.noQuiereRechazarUnaPeticion && $options.noQuiereRechazarUnaPeticion.apply($options, arguments);
    }),
    "class": "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  }, _hoisted_32)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [_hoisted_34, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[4] || (_cache[4] = function ($event) {
      return $data.formRechazar.comentario = $event;
    }),
    id: "rechazo",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.formRechazar.comentario]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[5] || (_cache[5] = function () {
      return $options.confirmarYRechazarPeticion && $options.confirmarYRechazarPeticion.apply($options, arguments);
    }),
    "class": "text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-orange-600 dark:hover:bg-orange-700 dark:focus:ring-orange-800"
  }, "Rechazar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[6] || (_cache[6] = function () {
      return $options.noQuiereRechazarUnaPeticion && $options.noQuiereRechazarUnaPeticion.apply($options, arguments);
    }),
    "class": "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  }, "Cancelar")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/components/Peticiones/PeticionItem.vue":
/*!*************************************************************!*\
  !*** ./resources/js/components/Peticiones/PeticionItem.vue ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _PeticionItem_vue_vue_type_template_id_21963d19__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./PeticionItem.vue?vue&type=template&id=21963d19 */ "./resources/js/components/Peticiones/PeticionItem.vue?vue&type=template&id=21963d19");
/* harmony import */ var _PeticionItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./PeticionItem.vue?vue&type=script&lang=js */ "./resources/js/components/Peticiones/PeticionItem.vue?vue&type=script&lang=js");
/* harmony import */ var _home_turtlemate_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_turtlemate_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_PeticionItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_PeticionItem_vue_vue_type_template_id_21963d19__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/Peticiones/PeticionItem.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/Peticiones/index.vue":
/*!*************************************************!*\
  !*** ./resources/js/views/Peticiones/index.vue ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_vue_vue_type_template_id_b9b47582__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.vue?vue&type=template&id=b9b47582 */ "./resources/js/views/Peticiones/index.vue?vue&type=template&id=b9b47582");
/* harmony import */ var _index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.vue?vue&type=script&lang=js */ "./resources/js/views/Peticiones/index.vue?vue&type=script&lang=js");
/* harmony import */ var _home_turtlemate_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_turtlemate_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_index_vue_vue_type_template_id_b9b47582__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/Peticiones/index.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/Peticiones/PeticionItem.vue?vue&type=script&lang=js":
/*!*************************************************************************************!*\
  !*** ./resources/js/components/Peticiones/PeticionItem.vue?vue&type=script&lang=js ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PeticionItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PeticionItem_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PeticionItem.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Peticiones/PeticionItem.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/Peticiones/index.vue?vue&type=script&lang=js":
/*!*************************************************************************!*\
  !*** ./resources/js/views/Peticiones/index.vue?vue&type=script&lang=js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./index.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Peticiones/index.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/Peticiones/PeticionItem.vue?vue&type=template&id=21963d19":
/*!*******************************************************************************************!*\
  !*** ./resources/js/components/Peticiones/PeticionItem.vue?vue&type=template&id=21963d19 ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PeticionItem_vue_vue_type_template_id_21963d19__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_PeticionItem_vue_vue_type_template_id_21963d19__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./PeticionItem.vue?vue&type=template&id=21963d19 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/Peticiones/PeticionItem.vue?vue&type=template&id=21963d19");


/***/ }),

/***/ "./resources/js/views/Peticiones/index.vue?vue&type=template&id=b9b47582":
/*!*******************************************************************************!*\
  !*** ./resources/js/views/Peticiones/index.vue?vue&type=template&id=b9b47582 ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_template_id_b9b47582__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_index_vue_vue_type_template_id_b9b47582__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./index.vue?vue&type=template&id=b9b47582 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Peticiones/index.vue?vue&type=template&id=b9b47582");


/***/ })

}]);