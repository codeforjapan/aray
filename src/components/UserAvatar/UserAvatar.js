import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Storage } from 'aws-amplify';

import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  avatar: {
    border: '1px solid rgba(255,255,255,0.3)',
  },
}));

export default function UserAvatar({ username }) {
  const classes = useStyles();

  const [uri, setUri] = useState();
  const [s3Key, setS3Key] = useState();

  useEffect(() => {
    (async () => {
      setUri(await Storage.get(s3Key));
    })();
  }, [s3Key]);

  useEffect(() => {
    setS3Key(`users/${username}/avatar.jpeg`);
  }, [username]);

  return (
    <Avatar
      alt={''}
      src={uri}
      variant="circle"
      className={classes.avatar}
    />
  );
}

UserAvatar.propTypes = {
  username: PropTypes.string.isRequired,
};
