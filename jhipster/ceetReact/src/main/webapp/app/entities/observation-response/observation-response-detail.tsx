import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { TextFormat, Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { APP_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './observation-response.reducer';

export const ObservationResponseDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const observationResponseEntity = useAppSelector(state => state.observationResponse.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="observationResponseDetailsHeading">
          <Translate contentKey="ceetApp.observationResponse.detail.title">ObservationResponse</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{observationResponseEntity.id}</dd>
          <dt>
            <span id="numberObservation">
              <Translate contentKey="ceetApp.observationResponse.numberObservation">Number Observation</Translate>
            </span>
          </dt>
          <dd>{observationResponseEntity.numberObservation}</dd>
          <dt>
            <span id="obsevation">
              <Translate contentKey="ceetApp.observationResponse.obsevation">Obsevation</Translate>
            </span>
          </dt>
          <dd>{observationResponseEntity.obsevation}</dd>
          <dt>
            <span id="juries">
              <Translate contentKey="ceetApp.observationResponse.juries">Juries</Translate>
            </span>
          </dt>
          <dd>{observationResponseEntity.juries}</dd>
          <dt>
            <span id="dateObservation">
              <Translate contentKey="ceetApp.observationResponse.dateObservation">Date Observation</Translate>
            </span>
          </dt>
          <dd>
            {observationResponseEntity.dateObservation ? (
              <TextFormat value={observationResponseEntity.dateObservation} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <Translate contentKey="ceetApp.observationResponse.groupResponse">Group Response</Translate>
          </dt>
          <dd>{observationResponseEntity.groupResponse ? observationResponseEntity.groupResponse.id : ''}</dd>
          <dt>
            <Translate contentKey="ceetApp.observationResponse.customer">Customer</Translate>
          </dt>
          <dd>{observationResponseEntity.customer ? observationResponseEntity.customer.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/observation-response" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/observation-response/${observationResponseEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ObservationResponseDetail;
