import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import filesActions from '../store/actions/filesActions';
import uploadActions from '../store/actions/uploadActions';

import File from './File';

class Home extends Component {
  static propTypes = {
    getUploaded: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
    files: PropTypes.object.isRequired,
  }

  componentDidMount = () => {
    this.props.getUploaded();
    this.uploader = this.props.initialize({
      button: this.uploadButton,
    });
  }

  render = () => {
    const { files } = this.props;
    return <div className="ui container">
      <div className="ui basic segment">
        <a className="ui icon button" href="https://github.com/ccnuyan/ass-node">
          <i className="github icon"></i>
          Github
        </a>
        <div className="ui divider"></div>
        <div ref={(e) => { this.uploadButton = e; }} className="ui primary button">
          Upload (0-1Mb)
        </div>
        <div className="ui divider"></div>
        <div className="ui header">
          Uploaded File Records In Session:
        </div>
        <div className="ui four cards">
          {Object.keys(files).map(file => <File key={file} file={files[file]} />)}
        </div>
      </div>
    </div>;
  }
}

const mapStateToProps = state => ({
  files: state.ass.toJSON().files,
});

const mapDispatchToProps = dispatch => ({
  getUploaded: () => dispatch(filesActions.getUploaded()),
  initialize: ({ button }) => {
    dispatch(uploadActions.initialize({ button }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
