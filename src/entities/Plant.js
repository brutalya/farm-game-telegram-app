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
exports.Plant = void 0;
// src/entities/Plant.ts
var typeorm_1 = require("typeorm");
var Plant = function () {
    var _classDecorators = [(0, typeorm_1.Entity)()];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _id_decorators;
    var _id_initializers = [];
    var _id_extraInitializers = [];
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _tier_decorators;
    var _tier_initializers = [];
    var _tier_extraInitializers = [];
    var _cost_decorators;
    var _cost_initializers = [];
    var _cost_extraInitializers = [];
    var _sellPrice_decorators;
    var _sellPrice_initializers = [];
    var _sellPrice_extraInitializers = [];
    var _growTime_decorators;
    var _growTime_initializers = [];
    var _growTime_extraInitializers = [];
    var Plant = _classThis = /** @class */ (function () {
        function Plant_1() {
            this.id = __runInitializers(this, _id_initializers, void 0);
            this.name = (__runInitializers(this, _id_extraInitializers), __runInitializers(this, _name_initializers, void 0));
            this.tier = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _tier_initializers, void 0));
            this.cost = (__runInitializers(this, _tier_extraInitializers), __runInitializers(this, _cost_initializers, void 0));
            this.sellPrice = (__runInitializers(this, _cost_extraInitializers), __runInitializers(this, _sellPrice_initializers, void 0));
            this.growTime = (__runInitializers(this, _sellPrice_extraInitializers), __runInitializers(this, _growTime_initializers, void 0));
            __runInitializers(this, _growTime_extraInitializers);
        }
        return Plant_1;
    }());
    __setFunctionName(_classThis, "Plant");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _id_decorators = [(0, typeorm_1.PrimaryGeneratedColumn)('uuid')];
        _name_decorators = [(0, typeorm_1.Column)({ unique: true })];
        _tier_decorators = [(0, typeorm_1.Column)()];
        _cost_decorators = [(0, typeorm_1.Column)()];
        _sellPrice_decorators = [(0, typeorm_1.Column)()];
        _growTime_decorators = [(0, typeorm_1.Column)()];
        __esDecorate(null, null, _id_decorators, { kind: "field", name: "id", static: false, private: false, access: { has: function (obj) { return "id" in obj; }, get: function (obj) { return obj.id; }, set: function (obj, value) { obj.id = value; } }, metadata: _metadata }, _id_initializers, _id_extraInitializers);
        __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
        __esDecorate(null, null, _tier_decorators, { kind: "field", name: "tier", static: false, private: false, access: { has: function (obj) { return "tier" in obj; }, get: function (obj) { return obj.tier; }, set: function (obj, value) { obj.tier = value; } }, metadata: _metadata }, _tier_initializers, _tier_extraInitializers);
        __esDecorate(null, null, _cost_decorators, { kind: "field", name: "cost", static: false, private: false, access: { has: function (obj) { return "cost" in obj; }, get: function (obj) { return obj.cost; }, set: function (obj, value) { obj.cost = value; } }, metadata: _metadata }, _cost_initializers, _cost_extraInitializers);
        __esDecorate(null, null, _sellPrice_decorators, { kind: "field", name: "sellPrice", static: false, private: false, access: { has: function (obj) { return "sellPrice" in obj; }, get: function (obj) { return obj.sellPrice; }, set: function (obj, value) { obj.sellPrice = value; } }, metadata: _metadata }, _sellPrice_initializers, _sellPrice_extraInitializers);
        __esDecorate(null, null, _growTime_decorators, { kind: "field", name: "growTime", static: false, private: false, access: { has: function (obj) { return "growTime" in obj; }, get: function (obj) { return obj.growTime; }, set: function (obj, value) { obj.growTime = value; } }, metadata: _metadata }, _growTime_initializers, _growTime_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Plant = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Plant = _classThis;
}();
exports.Plant = Plant;
