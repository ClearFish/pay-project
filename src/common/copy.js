
  export function copyDomText(val) {
    // 获取需要复制的元素以及元素内的文本内容
    const text = val;
    // 添加一个input元素放置需要的文本内容
    const input = document.createElement("input");
    input.value = text;
    document.body.appendChild(input);
    // 选中并复制文本到剪切板
    input.select();
    document.execCommand("copy");
    // 移除input元素
    document.body.removeChild(input);
  }