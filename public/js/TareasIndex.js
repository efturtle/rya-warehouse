"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["TareasIndex"],{

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Tareas.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Tareas.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************/
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
  methods: {
    noQuiereEditarTarea: function noQuiereEditarTarea() {
      this.quiereEditarTarea = false;
    },
    editarTarea: function editarTarea(tarea_id) {
      this.quiereEditarTarea = true;
      var tarea = this.tareas.find(function (tarea) {
        return tarea.id == tarea_id;
      }); // fill in current tarea

      this.form.nombre = tarea.nombre;
      this.form.descripcion = tarea.descripcion;
      this.form.user_id = tarea.user_id;
      this.activeEditTareaId = tarea.id;
    },
    confirmarYEditarTarea: function confirmarYEditarTarea() {
      var _this = this;

      // validate for null inputs
      if (this.form.nombre == '') {
        this.sweetAlertToast('campo vacio', 'Nombre de la tarea', 'warning');
        return;
      }

      if (this.form.descripcion == '') {
        this.sweetAlertToast('campo vacio', 'Descripcion de la tarea', 'warning');
        return;
      }

      if (this.form.user_id == '') {
        this.sweetAlertToast('campo vacio', 'Asigngado de la tarea', 'warning');
        return;
      } // send the tarea to the backend


      axios.put("/api/v1/tareas/".concat(this.activeEditTareaId), this.form).then(function () {
        _this.sweetAlertToast('Exito', 'Tarea Actualizada', 'success'); // actualiza las tarea


        var tarea = _this.getTarea(_this.activeEditTareaId);

        tarea.nombre = _this.form.nombre;
        tarea.descripcion = _this.form.descripcion;
        tarea.user_id = _this.form.user_id; // esconder modals

        _this.quiereEditarTarea = false;
      })["catch"](function (error) {
        _this.$swal('Error', error, 'error');
      });
    },
    getTarea: function getTarea(tarea_id) {
      return this.tareas.find(function (tarea) {
        return tarea.id == tarea_id;
      });
    },
    eliminarTarea: function eliminarTarea(tarea_id) {
      var _this2 = this;

      this.$swal({
        title: 'Eliminar Tarea?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(function (result) {
        if (result.value) {
          axios["delete"]("/api/v1/tareas/".concat(tarea_id)).then(function () {
            _this2.sweetAlertToast('Exito', 'Se elimino una tarea', 'success');

            _this2.tareas.splice(_this2.tareas.findIndex(function (tarea) {
              return tarea.id == tarea_id;
            }), 1);
          })["catch"](function (error) {
            _this2.sweetAlertToast('Error', error, 'error');
          });
        }
      });
    },
    tareaTerminada: function tareaTerminada(tarea_id) {
      var _this3 = this;

      this.$swal({
        title: 'Terminar tarea?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
        showCloseButton: true,
        showLoaderOnConfirm: true
      }).then(function (result) {
        if (result.value) {
          axios.patch("/api/v1/tareas/cambiar-estado/".concat(tarea_id)).then(function (response) {
            _this3.sweetAlertToast('Exito', 'Ah Terminado una tarea!', 'success');

            var tarea = _this3.getTarea(tarea_id);

            tarea.estatus = '2';
          })["catch"](function (error) {
            _this3.sweetAlertToast('Error', error, 'error');
          });
        }
      });
    },
    notDone: function notDone(tarea_id) {
      var tarea = this.getTarea(tarea_id);

      if (tarea.estatus != 2) {
        return true;
      }

      return false;
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
  data: function data() {
    return {
      tareas: [],
      activeUser: [],
      users: [],
      quiereEditarTarea: false,
      activeEditTareaId: '',
      form: {
        nombre: '',
        descripcion: '',
        user_id: ''
      }
    };
  },
  created: function created() {
    var _this4 = this;

    // get the current user
    axios.get('/api/user').then(function (data) {
      _this4.activeUser = data.data;

      if (data.data.puesto == '3') {
        axios.get("/api/v1/user/tareas/".concat(_this4.activeUser.id)).then(function (data) {
          _this4.tareas = data.data.tareas;
        });
      } else {
        axios.get('/api/v1/tareas').then(function (data) {
          _this4.tareas = data.data.tareas;
        });
      }
    })["catch"](function (error) {
      _this4.$swal('error', "Fallo en conseguir al usuario activo, reiniciar la app ".concat(error), 'error');

      axios.get('/api/v1/tareas').then(function (data) {
        _this4.tareas = data.data.tareas;
      });
    });
  },
  mounted: function mounted() {
    var _this5 = this;

    // get all the users
    axios.get('/api/v1/users').then(function (response) {
      _this5.users = response.data.usuarios;
    })["catch"](function (error) {
      _this5.$swal('error', error, 'error');
    });
  },
  computed: {
    isAdmin: function isAdmin() {
      if (this.activeUser.puesto != 3) {
        return true;
      }

      return false;
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Tareas.vue?vue&type=template&id=62d00a71":
/*!***********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Tareas.vue?vue&type=template&id=62d00a71 ***!
  \***********************************************************************************************************************************************************************************************************************************************************************/
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
  "class": "flex place-content-end mb-4"
};
var _hoisted_3 = {
  "class": "px-4 py-2 text-white bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
};

var _hoisted_4 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)("Crear Tarea");

var _hoisted_5 = {
  "class": "table-fixed w-full border divide-y divide-gray-200"
};

var _hoisted_6 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("thead", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tr", null, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs font-medium tracking-wider leading-4 text-left text-gray-500"
}, "Nombre")]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs font-medium tracking-wider leading-4 text-left text-gray-500"
}, "Estatus")]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
  "class": "px-6 py-3 bg-gray-50"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
  "class": "text-xs font-medium tracking-wider leading-4 text-left text-gray-500"
}, "Usuario")]), /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("th", {
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
  key: 0
};
var _hoisted_11 = {
  key: 1
};
var _hoisted_12 = {
  "class": "px-6 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_13 = {
  "class": "grid grid-cols-2 gap-2 justify-items-center px-4 py-4 text-sm leading-5 text-gray-900 whitespace-no-wrap"
};
var _hoisted_14 = ["onClick"];
var _hoisted_15 = ["onClick"];
var _hoisted_16 = ["onClick"];

var _hoisted_17 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
  xmlns: "http://www.w3.org/2000/svg",
  "class": "w-4 md:w-6",
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  "stroke-width": "2"
}, [/*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  d: "M5 13l4 4L19 7"
})], -1
/* HOISTED */
);

var _hoisted_18 = [_hoisted_17];
var _hoisted_19 = {
  "class": "mt-5"
};
var _hoisted_20 = {
  key: 0,
  id: "defaultModal",
  tabindex: "-1",
  "class": "wegotamodalhere overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full"
};
var _hoisted_21 = {
  "class": "bg-slate-50 relative p-4 w-full max-w-2xl h-full md:h-auto shadow dark:bg-gray-700"
};
var _hoisted_22 = {
  "class": "bg-slate-50 relative bg-white rounded-lg"
};
var _hoisted_23 = {
  "class": "flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600"
};

var _hoisted_24 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h3", {
  "class": "text-xl font-semibold text-gray-900 dark:text-white"
}, " Editar Tarea ", -1
/* HOISTED */
);

var _hoisted_25 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
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

var _hoisted_26 = [_hoisted_25];
var _hoisted_27 = {
  "class": "grid grid-cols-1 gap-4 place-items-center"
};

var _hoisted_28 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "nombre",
  "class": "block text-sm font-medium text-gray-700"
}, "Tarea", -1
/* HOISTED */
);

var _hoisted_29 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "descripcion",
  "class": "block text-sm font-medium text-gray-700"
}, "Descripcion", -1
/* HOISTED */
);

var _hoisted_30 = /*#__PURE__*/(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("label", {
  "for": "asignado",
  "class": "block text-sm font-medium text-gray-700"
}, "Asignado", -1
/* HOISTED */
);

var _hoisted_31 = ["value"];
var _hoisted_32 = {
  "class": "flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _component_router_link = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("router-link");

  var _component_icons = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("icons");

  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_router_link, {
    to: {
      name: 'tarea.create'
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
  , ["to"])])], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isAdmin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("table", _hoisted_5, [_hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("tbody", _hoisted_7, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.tareas, function (tarea) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("tr", {
      key: tarea.id,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["bg-white", tarea.estatus == 2 ? 'bg-green-200 text-white' : ''])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tarea.nombre), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_9, [tarea.estatus == 1 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_10, "Creada")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), tarea.estatus == 2 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_11, "Terminada")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(tarea.usuario), 1
    /* TEXT */
    ), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Actions "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("td", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Edit "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2",
      onClick: function onClick($event) {
        return $options.editarTarea(tarea.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "edit",
      width: "30px",
      height: "30px",
      "class": ""
    })], 8
    /* PROPS */
    , _hoisted_14), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isAdmin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Delete "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400 mr-2",
      onClick: function onClick($event) {
        return $options.eliminarTarea(tarea.id);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_icons, {
      name: "trash",
      width: "30px",
      height: "30px"
    })], 8
    /* PROPS */
    , _hoisted_15), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, $options.isAdmin]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Finish "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
      "class": "btn bg-gray-500 text-white p-1 rounded hover:bg-gray-400",
      onClick: function onClick($event) {
        return $options.tareaTerminada(tarea.id);
      }
    }, _hoisted_18, 8
    /* PROPS */
    , _hoisted_16), [[vue__WEBPACK_IMPORTED_MODULE_0__.vShow, !$options.isAdmin && $options.notDone(tarea.id)]])])], 2
    /* CLASS */
    );
  }), 128
  /* KEYED_FRAGMENT */
  ))])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Editar Tarea "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_19, [$data.quiereEditarTarea ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal content "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal header "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [_hoisted_24, (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.noQuiereEditarTarea && $options.noQuiereEditarTarea.apply($options, arguments);
    }),
    "class": "text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
  }, _hoisted_26)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[1] || (_cache[1] = function ($event) {
      return $data.form.nombre = $event;
    }),
    id: "nombre",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.nombre]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("input", {
    type: "text",
    "onUpdate:modelValue": _cache[2] || (_cache[2] = function ($event) {
      return $data.form.descripcion = $event;
    }),
    id: "descripcion",
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, null, 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.form.descripcion]])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [_hoisted_30, (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
    "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
      return $data.form.user = $event;
    }),
    "class": "mb-3 rounded-md shadow-sm border-gray-300 focus:border-orange-300 focus:ring focus:ring-orange-200 focus:ring-opacity-50"
  }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.users, function (user) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
      value: {
        id: user.id,
        text: user.name
      },
      key: user.id,
      id: "optionSelected"
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(user.name), 9
    /* TEXT, PROPS */
    , _hoisted_31);
  }), 128
  /* KEYED_FRAGMENT */
  ))], 512
  /* NEED_PATCH */
  ), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.form.user]])])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Modal footer "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[4] || (_cache[4] = function () {
      return $options.confirmarYEditarTarea && $options.confirmarYEditarTarea.apply($options, arguments);
    }),
    "class": "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  }, "Cambiar"), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
    type: "button",
    onClick: _cache[5] || (_cache[5] = function () {
      return $options.noQuiereEditarTarea && $options.noQuiereEditarTarea.apply($options, arguments);
    }),
    "class": "text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
  }, "Cancelar")])])])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 64
  /* STABLE_FRAGMENT */
  );
}

/***/ }),

/***/ "./resources/js/views/Tareas.vue":
/*!***************************************!*\
  !*** ./resources/js/views/Tareas.vue ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tareas_vue_vue_type_template_id_62d00a71__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tareas.vue?vue&type=template&id=62d00a71 */ "./resources/js/views/Tareas.vue?vue&type=template&id=62d00a71");
/* harmony import */ var _Tareas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tareas.vue?vue&type=script&lang=js */ "./resources/js/views/Tareas.vue?vue&type=script&lang=js");
/* harmony import */ var _home_turtlemate_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_home_turtlemate_open_source_repos_rya_warehouse_api_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_Tareas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Tareas_vue_vue_type_template_id_62d00a71__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/views/Tareas.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/views/Tareas.vue?vue&type=script&lang=js":
/*!***************************************************************!*\
  !*** ./resources/js/views/Tareas.vue?vue&type=script&lang=js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tareas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tareas_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tareas.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Tareas.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/views/Tareas.vue?vue&type=template&id=62d00a71":
/*!*********************************************************************!*\
  !*** ./resources/js/views/Tareas.vue?vue&type=template&id=62d00a71 ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tareas_vue_vue_type_template_id_62d00a71__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tareas_vue_vue_type_template_id_62d00a71__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tareas.vue?vue&type=template&id=62d00a71 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/views/Tareas.vue?vue&type=template&id=62d00a71");


/***/ })

}]);