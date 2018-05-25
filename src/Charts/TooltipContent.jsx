import React from 'react';


const HEADER_ROW_STYLES = {
  backgroundColor: '#ddd',
  borderBottom: '1px solid black',
  textAlign: 'left',
};

const TABLE_STYLES = {
  borderCollapse: 'collapse',
  fontSize: 11,
  width: '100%', 
};

const TITLE_COL_STYLES = {
  width: 200,
  padding: 5,
};

const DOT_STYLE = {
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
  flex: '1 0 180px',
  wordWrap: 'break-word',
};

const METRIC_STYLE = {
  padding: 5,
  textAlign: 'right',
  verticalAlign: 'top',
};

const LEGEND_CELL_STYLE = {
  maxWidth: 200,
  padding: 5,
};

const TITLE_METRIC_STYLE = {
  padding: 5,
  textAlign: 'right',
};

const getDotStyle = color => ({
  ...DOT_STYLE,
  backgroundColor: color,
});

export default function TooltipContent({ items, metricTitles, title, }) {
  return (
    <div>
      <table style={TABLE_STYLES}>
        <thead>
          <tr style={HEADER_ROW_STYLES}>
            <th style={TITLE_COL_STYLES}>
              {title}
            </th>
            {metricTitles.map(mTitle => (
              <th
                key={mTitle}
                style={TITLE_METRIC_STYLE}
              >
                {mTitle}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map(({ color, legend, metrics}, index) => (
            <tr key={legend}>
              <td style={LEGEND_CELL_STYLE}>
                <div style={LEGEND_WRAPPER_STYLE}>
                  <div style={DOT_WRAPPER_STYLE}>
                    <div style={getDotStyle(color)} /> 
                  </div>
                  <div style={LEGEND_LABEL_STYLE}>
                    {legend.length > 55
                      ? `${legend.substring(0, 52)}...`
                      : legend
                    }
                  </div>
                </div>
              </td>
              {metrics.map((metric, index) => (
                <td key={index} style={METRIC_STYLE}>{metric}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}