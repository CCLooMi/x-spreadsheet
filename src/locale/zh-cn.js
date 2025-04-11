export default {
  toolbar: {
    undo: '撤销',
    redo: '恢复',
    print: '打印',
    paintformat: '格式刷',
    clearformat: '清除格式',
    format: '数据格式',
    fontName: '字体',
    fontSize: '字号',
    fontBold: '加粗',
    fontItalic: '倾斜',
    underline: '下划线',
    strike: '删除线',
    color: '字体颜色',
    bgcolor: '填充颜色',
    border: '边框',
    merge: '合并单元格',
    align: '水平对齐',
    valign: '垂直对齐',
    textwrap: '自动换行',
    freeze: '冻结',
    autofilter: '自动筛选',
    formula: '函数',
    more: '更多',
    sharp: '触发sharp事件',
  },
  contextmenu: {
    copy: '复制',
    cut: '剪切',
    paste: '粘贴',
    pasteValue: '粘贴数据',
    pasteFormat: '粘贴格式',
    pasteColsToRows:'粘贴列到行',
    pasteRowsToCols:'粘贴行到列',
    hide: '隐藏',
    insertRow: '插入行',
    insertColumn: '插入列',
    deleteSheet: '删除',
    deleteRow: '删除行',
    deleteColumn: '删除列',
    deleteCell: '删除',
    deleteCellText: '删除数据',
    validation: '数据验证',
    cellprintable: '可打印',
    cellnonprintable: '不可打印',
    celleditable: '可编辑',
    cellnoneditable: '不可编辑',
  },
  print: {
    size: '纸张大小',
    orientation: '方向',
    orientations: ['横向', '纵向'],
  },
  format: {
    normal: '正常',
    text: '文本',
    number: '数值',
    percent: '百分比',
    rmb: '人民币',
    usd: '美元',
    eur: '欧元',
    date: '短日期',
    time: '时间',
    datetime: '长日期',
    duration: '持续时间',
  },
  formula: {
    sum: '求和',
    average: '求平均值',
    max: '求最大值',
    min: '求最小值',
    concat: '字符拼接',
    _if: '条件判断',
    and: '和',
    or: '或',
  },
  validation: {
    required: '此值必填',
    notMatch: '此值不匹配验证规则',
    between: '此值应在 {} 和 {} 之间',
    notBetween: '此值不应在 {} 和 {} 之间',
    notIn: '此值不在列表中',
    equal: '此值应该等于 {}',
    notEqual: '此值不应该等于 {}',
    lessThan: '此值应该小于 {}',
    lessThanEqual: '此值应该小于等于 {}',
    greaterThan: '此值应该大于 {}',
    greaterThanEqual: '此值应该大于等于 {}',
  },
  error: {
    pasteForMergedCell: '无法对合并的单元格执行此操作',
  },
  calendar: {
    weeks: ['日', '一', '二', '三', '四', '五', '六'],
    months: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
  },
  button: {
    next: '下一步',
    cancel: '取消',
    remove: '删除',
    save: '保存',
    ok: '确认',
  },
  sort: {
    desc: '降序',
    asc: '升序',
  },
  filter: {
    empty: '空白',
  },
  dataValidation: {
    mode: '模式',
    range: '单元区间',
    criteria: '条件',
    modeType: {
      cell: '单元格',
      column: '列模式',
      row: '行模式',
    },
    type: {
      list: '列表',
      number: '数字',
      date: '日期',
      phone: '手机号',
      email: '电子邮件',
    },
    operator: {
      be: '在区间',
      nbe: '不在区间',
      lt: '小于',
      lte: '小于等于',
      gt: '大于',
      gte: '大于等于',
      eq: '等于',
      neq: '不等于',
    },
  },
};
