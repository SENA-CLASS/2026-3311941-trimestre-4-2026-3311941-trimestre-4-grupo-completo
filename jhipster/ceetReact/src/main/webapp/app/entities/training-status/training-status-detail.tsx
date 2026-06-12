import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './training-status.reducer';

export const TrainingStatusDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const trainingStatusEntity = useAppSelector(state => state.trainingStatus.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="trainingStatusDetailsHeading">
          <Translate contentKey="ceetApp.trainingStatus.detail.title">TrainingStatus</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{trainingStatusEntity.id}</dd>
          <dt>
            <span id="statusName">
              <Translate contentKey="ceetApp.trainingStatus.statusName">Status Name</Translate>
            </span>
          </dt>
          <dd>{trainingStatusEntity.statusName}</dd>
          <dt>
            <span id="stateTraining">
              <Translate contentKey="ceetApp.trainingStatus.stateTraining">State Training</Translate>
            </span>
          </dt>
          <dd>{trainingStatusEntity.stateTraining}</dd>
        </dl>
        <Button as={Link as any} to="/training-status" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/training-status/${trainingStatusEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TrainingStatusDetail;
