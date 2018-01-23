import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FileBody from './FileBody';

class File extends Component {
  static propTypes = {
    file: PropTypes.object.isRequired,
    states: PropTypes.object.isRequired,
  }
  componentDidUpdate = () => {
    const { file, states } = this.props;
    const uploadingState = states[file.uploadId];
    if (uploadingState) {
      $(this.progress).progress({
        value: uploadingState.uploaded,
        total: uploadingState.total,
        duration: 100,
      });
    }
  }

  render = () => {
    const { file, states } = this.props;
    const uploadingState = states[file.uploadId];
    return (
      <div className="ui card">
        <FileBody file={this.props.file} />
        {(uploadingState && uploadingState.status === 'waiting') ?
          <div className="ui active inverted dimmer">
            <div className="ui loader"></div>
          </div> : ''}
        {(uploadingState && uploadingState.status === 'uploading') ?
          <div ref={(e) => { this.progress = e; }} className="ui tiny indicating progress"
            style={{
              position: 'absolute', bottom: 0, left: 0, right: 0, width: '100%', margin: 0,
            }}
          ><div className="bar"></div>
          </div> : ''}
        {(uploadingState && uploadingState.status === 'error') ?
          <div className="ui extra">
            ERROR
        </div> : ''}
        {(!uploadingState) ? <div className="ui extra">
          <a className="ui button" target="blank" href={`/api/access?id=${file.id}`}>
            Download
            </a>
        </div> : ''}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  states: state.ass.toJSON().states,
});

export default connect(mapStateToProps)(File);
