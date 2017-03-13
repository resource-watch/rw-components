import React from 'react';
import isEqual from 'lodash/isEqual';

export default class Table extends React.Component {

  constructor(props) {
    super(props);

    this.setTableData(props);

    // Bindings
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
  }

  /* Component lifecycle */
  componentWillReceiveProps(nextProps) {
    if (!isEqual(this.props.data, nextProps.data)) {
      this.setTableData(nextProps);
    }
  }

  /* Component api */
  setTableData(props) {
    const { data } = props;

    /*
      Initial state
      - props.data => original data
      - filteredData => original data with filters and/or sort (if any) applied
    */
    this.state = {
      filteredData: data,
      currentPage: (this.state && this.state.currentPage) || 0,
      totalPages: Math.ceil(data.length / props.pageSize),
      query: {},
      sort: {}
    };
  }

  getPageBounds(page) {
    const bottom = page * this.props.pageSize;
    const top = bottom + this.props.pageSize;
    return { bottom, top };
  }

  nextPage() {
    if (this.state.currentPage === this.state.totalPages - 1) return;
    this.goToPage(this.state.currentPage + 1);
  }

  prevPage() {
    if (this.state.currentPage === 0) return;
    this.goToPage(this.state.currentPage - 1);
  }

  goToPage(page) {
    this.setState({
      currentPage: page
    });
  }

  /* Partial renders */
  renderTableHead() {
    return (
      <tr>
        {this.props.columns.map((c, index) => {
          return (
            <th key={index}>
              <span className="th-wrapper">
                <span>{c}</span>
              </span>
            </th>
          );
        })}
        {this.props.actionsColumn ? <th>Actions</th> : null}
      </tr>
    );
  }

  renderTableContent() {
    const { filteredData } = this.state;
    const { bottom, top } = this.getPageBounds(this.state.currentPage);

    if (!filteredData.length) {
      return (
        <tr>
          <td colSpan={this.props.columns.length}>No results found</td>
        </tr>
      );
    }

    /* Apply pagination to filteredData */
    const paginatedData = filteredData.slice(bottom, top);

    return paginatedData.map((row, index) => {
      return (
        <tr key={index}>
          {this.props.columns.map((col, i) => <td key={i}>{row[col]}</td>)}
          {this.props.actionsColumn ? <td><a href={`/datasets/${row.id}/edit`}>Edit</a> | Remove</td> : null}
        </tr>
      );
    });
  }

  renderTableFooter() {
    return (
      <div className="table-footer">
        {/* Paginator */}
        {this.props.paginated &&
          <ul className="paginator">
            <li className="paginator-link"><button className="paginator-btn" onClick={this.prevPage}>Prev</button></li>
            <li className="paginator-link"><button className="paginator-btn" onClick={this.nextPage}>Next</button></li>
          </ul>
        }
        {/* Page locator */}
        {this.props.paginated &&
          <span>Page <span>{this.state.currentPage + 1}</span> of <span>{this.state.totalPages}</span></span>
        }
      </div>
    );
  }

  /* Render */
  render() {
    return (
      <div className="c-table">
        {/* Table */}
        <table className="table">
          <thead>
            {/* Table head */}
            {this.renderTableHead()}
          </thead>
          <tbody>
            {/* Table content */}
            {this.renderTableContent()}
          </tbody>
        </table>
        {this.renderTableFooter()}
      </div>
    );
  }
}

/* Property typing */
Table.propTypes = {
  data: React.PropTypes.array,
  columns: React.PropTypes.array,
  actionsColumn: React.PropTypes.bool,
  editablePath: React.PropTypes.string,
  removablePath: React.PropTypes.string,
  paginated: React.PropTypes.bool,
  pageSize: React.PropTypes.number,
  initialPage: React.PropTypes.number
};

/* Property default values */
Table.defaultProps = {
  data: [],
  columns: [],
  actionsColumn: true,
  editablePath: '/datasets/:id/edit',
  removablePath: '/datasets/:id/remove',
  paginated: true,
  pageSize: 10,
  initialPage: 0
};
