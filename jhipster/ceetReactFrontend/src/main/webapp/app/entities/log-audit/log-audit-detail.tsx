import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './log-audit.reducer';

export const LogAuditDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const logAuditEntity = useAppSelector(state => state.logAudit.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="logAuditDetailsHeading">
          <Translate contentKey="ceet2App.logAudit.detail.title">LogAudit</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{logAuditEntity.id}</dd>
          <dt>
            <span id="levelAudit">
              <Translate contentKey="ceet2App.logAudit.levelAudit">Level Audit</Translate>
            </span>
          </dt>
          <dd>{logAuditEntity.levelAudit}</dd>
          <dt>
            <span id="logName">
              <Translate contentKey="ceet2App.logAudit.logName">Log Name</Translate>
            </span>
          </dt>
          <dd>{logAuditEntity.logName}</dd>
          <dt>
            <span id="messageAudit">
              <Translate contentKey="ceet2App.logAudit.messageAudit">Message Audit</Translate>
            </span>
          </dt>
          <dd>{logAuditEntity.messageAudit}</dd>
          <dt>
            <span id="dateAudit">
              <Translate contentKey="ceet2App.logAudit.dateAudit">Date Audit</Translate>
            </span>
          </dt>
          <dd>{logAuditEntity.dateAudit ? <TextFormat value={logAuditEntity.dateAudit} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <Translate contentKey="ceet2App.logAudit.customer">Customer</Translate>
          </dt>
          <dd>{logAuditEntity.customer ? logAuditEntity.customer.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/log-audit" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/log-audit/${logAuditEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LogAuditDetail;
