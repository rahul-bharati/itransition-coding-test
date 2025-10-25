import {model, Schema} from "mongoose";
import {ITableColumn, ITableConfig, KEYS} from "../interface/table-config";

const ColumnSchema = new Schema<ITableColumn>({
    key: {type: String, required: true, enum: KEYS},
    label: {type: String, required: true},
    visible: {type: Boolean, required: true},
    order: {type: Number, required: true}
}, {_id: false})

const tableConfigSchema = new Schema<ITableConfig>({
    columns: {type: [ColumnSchema], required: true}
})

const TablConfig = model<ITableConfig>('TableConfigController', tableConfigSchema);

export default TablConfig;