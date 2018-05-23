import React from 'react';


const HEADER_ROW_STYLES = {
  backgroundColor: 'gray',
  borderBottom: '1px solid black',
  textAlign: 'left',
};

const TABLE_STYLES = {
  borderCollapse: 'collapse',
  fontSize: 11,
  // cellPadding: 0,
  // cellSpacing: 0,
  width: '100%', 
};

const TITLE_COL_STYLES = {
  width: 200,
  padding: 5,
};

const DOT_STYLE = {
  backgroundColor: 'red',
  height: 5,
  width: 5,
  borderRadius: '50%',
}

const LEGEND_WRAPPER_STYLE = {
  display: 'flex',
  flex: '0 auto',
};

const DOT_WRAPPER_STYLE = {
  flex: '0 0 10px',
  marginTop: 3,
};

const LEGEND_LABEL_STYLE = {
  flex: '1 0 auto',
  maxWidth: 185
};

const METRIC_STYLE = {
  padding: 5,
  verticalAlign: 'top',
};

const LEGEND_CELL_STYLE = {
  padding: 5,
};

const TITLE_METRIC_STYLE = {
  padding: 5,
};


export default function TooltipContent({ title }) {
  return (
    <div>
      <table style={TABLE_STYLES}>
        <thead>
          <tr style={HEADER_ROW_STYLES}>
            <th style={TITLE_COL_STYLES}>
              It works
            </th>
            <th style={TITLE_METRIC_STYLE}>
              Installs
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={LEGEND_CELL_STYLE}>
              <div style={LEGEND_WRAPPER_STYLE}>
                <div style={DOT_WRAPPER_STYLE}>
                  <div style={DOT_STYLE} /> 
                </div>
                <div style={LEGEND_LABEL_STYLE}>
                  <div>IT works it really does, it should truncate eventually</div>
                </div>
              </div>
            </td>
            <td style={METRIC_STYLE}>500,000</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
