import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './assessment.reducer';

export const AssessmentDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const assessmentEntity = useAppSelector(state => state.assessment.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="assessmentDetailsHeading">
          <Translate contentKey="ceet2App.assessment.detail.title">Assessment</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{assessmentEntity.id}</dd>
          <dt>
            <span id="assessmentType">
              <Translate contentKey="ceet2App.assessment.assessmentType">Assessment Type</Translate>
            </span>
          </dt>
          <dd>{assessmentEntity.assessmentType}</dd>
          <dt>
            <span id="assessmentState">
              <Translate contentKey="ceet2App.assessment.assessmentState">Assessment State</Translate>
            </span>
          </dt>
          <dd>{assessmentEntity.assessmentState}</dd>
        </dl>
        <Button as={Link as any} to="/assessment" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/assessment/${assessmentEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default AssessmentDetail;
