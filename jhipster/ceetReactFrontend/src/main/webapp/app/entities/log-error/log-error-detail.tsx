import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './log-error.reducer';

export const LogErrorDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const logErrorEntity = useAppSelector(state => state.logError.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="logErrorDetailsHeading">
          <Translate contentKey="ceet2App.logError.detail.title">LogError</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{logErrorEntity.id}</dd>
          <dt>
            <span id="levelError">
              <Translate contentKey="ceet2App.logError.levelError">Level Error</Translate>
            </span>
          </dt>
          <dd>{logErrorEntity.levelError}</dd>
          <dt>
            <span id="logName">
              <Translate contentKey="ceet2App.logError.logName">Log Name</Translate>
            </span>
          </dt>
          <dd>{logErrorEntity.logName}</dd>
          <dt>
            <span id="messageError">
              <Translate contentKey="ceet2App.logError.messageError">Message Error</Translate>
            </span>
          </dt>
          <dd>{logErrorEntity.messageError}</dd>
          <dt>
            <span id="dateError">
              <Translate contentKey="ceet2App.logError.dateError">Date Error</Translate>
            </span>
          </dt>
          <dd>{logErrorEntity.dateError ? <TextFormat value={logErrorEntity.dateError} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="ceet2App.logError.customer">Customer</Translate>
          </dt>
          <dd>{logErrorEntity.customer ? logErrorEntity.customer.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/log-error" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/log-error/${logErrorEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LogErrorDetail;
