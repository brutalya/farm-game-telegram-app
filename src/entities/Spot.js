"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Spot = void 0;
var typeorm_1 = require("typeorm");
var Field_1 = require("./Field");
var Plant_1 = require("./Plant");
var Spot = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _field_decorators;
    var _field_initializers = [];
    var _field_extraInitializers = [];
    var _plant_decorators;
    var _plant_initializers = [];
    var _plant_extraInitializers = [];
    var _plantingTime_decorators;
    var _plantingTime_initializers = [];
    var _plantingTime_extraInitializers = [];
    var _harvestTime_decorators;
    var _harvestTime_initializers = [];
    var _harvestTime_extraInitializers = [];
    var _status_decorators;
    var _status_initializers = [];
    var _status_extraInitializers = [];
    var Spot = _classThis = /** @class */ (function () {
        function Spot_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.field = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _field_initializers, void 0));
            this.plant = (__runInitializers(this, _field_extraInitializers), __runInitializers(this, _plant_initializers, void 0));
            this.plantingTime = (__runInitializers(this, _plant_extraInitializers), __runInitializers(this, _plantingTime_initializers, void 0));
            this.harvestTime = (__runInitializers(this, _plantingTime_extraInitializers), __runInitializers(this, _harvestTime_initializers, void 0));
            this.status = (__runInitializers(this, _harvestTime_extraInitializers), __runInitializers(this, _status_initializers, void 0));
            __runInitializers(this, _status_extraInitializers);
        }
        return Spot_1;
    }());
    __setFunctionName(_classThis, "Spot");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)()];
        _field_decorators = [(0, typeorm_1.ManyToOne)(function () { return Field_1.Field; }, function (field) { return field.spots; })];
        _plant_decorators = [(0, typeorm_1.ManyToOne)(function () { return Plant_1.Plant; })];
        _plantingTime_decorators = [(0, typeorm_1.Column)({ type: 'bigint', nullable: true })];
        _harvestTime_decorators = [(0, typeorm_1.Column)({ type: 'bigint', nullable: true })];
        _status_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _field_decorators, { kind: "field", name: "field", static: false, private: false, access: { has: function (obj) { return "field" in obj; }, get: function (obj) { return obj.field; }, set: function (obj, value) { obj.field = value; } }, metadata: _metadata }, _field_initializers, _field_extraInitializers);
        __esDecorate(null, null, _plant_decorators, { kind: "field", name: "plant", static: false, private: false, access: { has: function (obj) { return "plant" in obj; }, get: function (obj) { return obj.plant; }, set: function (obj, value) { obj.plant = value; } }, metadata: _metadata }, _plant_initializers, _plant_extraInitializers);
        __esDecorate(null, null, _plantingTime_decorators, { kind: "field", name: "plantingTime", static: false, private: false, access: { has: function (obj) { return "plantingTime" in obj; }, get: function (obj) { return obj.plantingTime; }, set: function (obj, value) { obj.plantingTime = value; } }, metadata: _metadata }, _plantingTime_initializers, _plantingTime_extraInitializers);
        __esDecorate(null, null, _harvestTime_decorators, { kind: "field", name: "harvestTime", static: false, private: false, access: { has: function (obj) { return "harvestTime" in obj; }, get: function (obj) { return obj.harvestTime; }, set: function (obj, value) { obj.harvestTime = value; } }, metadata: _metadata }, _harvestTime_initializers, _harvestTime_extraInitializers);
        __esDecorate(null, null, _status_decorators, { kind: "field", name: "status", static: false, private: false, access: { has: function (obj) { return "status" in obj; }, get: function (obj) { return obj.status; }, set: function (obj, value) { obj.status = value; } }, metadata: _metadata }, _status_initializers, _status_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Spot = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Spot = _classThis;
}();
exports.Spot = Spot;
