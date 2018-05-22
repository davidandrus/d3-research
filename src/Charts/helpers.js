const dataIsDeep = data => data[0] && Array.isArray(data[0]);

export const transformMultiChartData = data => {
  let dataArr = dataIsDeep(data)
    ? data
    : [data];

  /**
   * this is gross, but vx doesn't call x or y functions with index
   * https://github.com/hshoff/vx/issues/295
   */
  return dataArr.map(arr => arr.map((point,index) => ({
    point,
    index,
  })));
}

export const getMultiChartDataLength = data => 
  dataIsDeep(data) ? data[0].length : data.length;
