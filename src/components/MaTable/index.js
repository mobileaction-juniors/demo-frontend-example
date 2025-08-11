/**
 * @author Sezer Tetik
 * @description MaTable component for MobileAction Junior Actioner Frontend Repository
 *
 * COMPOUND COMPONENT: MaTable
 * This component is a compound component that allows for flexible table structures.
 * This type of pattern generally used in React ecosystem and unstyled component
 * libraries such as Radix UI, Headless UI, etc. Also, I found a similar project that
 * uses this pattern in Vue.js: RekaUI (https://github.com/unovue/reka-ui, previously, Radix Vue).
 * According to NPM weekly download statistics, RekaUI has over 300,000 weekly downloads, and it
 * is gaining popularity rapidly. It has just 3,000 weekly downloads in the beginning of the 2025!
 *
 * This pattern allows for a more modular and reusable table structure, where each part of the
 * table (header, body, row, cell) can be defined separately.
 *
 * Usage Structure:
 * <MaTable>
 *     <MaTable.Header>
 *         <MaTable.Row>
 *             <MaTable.Cell>Header 1</MaTable.Cell>
 *             <MaTable.Cell>Header 2</MaTable.Cell>
 *         </MaTable.Row>
 *     </MaTable.Header>
 *     <MaTable.Data>
 *         <MaTable.Row>
 *             <MaTable.Cell>Data 1</MaTable.Cell>
 *             <MaTable.Cell>Data 2</MaTable.Cell>
 *         </MaTable.Row>
 *     </MaTable.Data>
 * </MaTable>
 *
 * References:
 * - https://medium.com/@trucedesignz/how-to-create-compound-components-in-vuejs-f4dee56d5a6e
 * - https://github.com/unovue/reka-ui/blob/v2/packages/core/src/DatePicker/*
 * - https://reka-ui.com/docs/guides/composition
 * - https://www.patterns.dev/react/compound-pattern/
 * - https://vuejs.org/guide/components/slots.html#slots
 */

import MaTable from "./MaTable.vue";
import MaTableHeader from "./MaTableHeader.vue";
import MaTableData from "./MaTableData.vue";
import MaTableRow from "./MaTableRow.vue";
import MaTableCell from "./MaTableCell.vue";

MaTable.Header = MaTableHeader;
MaTable.Data = MaTableData;
MaTable.Row = MaTableRow;
MaTable.Cell = MaTableCell;

export { MaTable };
