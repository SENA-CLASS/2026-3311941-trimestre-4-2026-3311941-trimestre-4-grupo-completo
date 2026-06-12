import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './learning-result.reducer';

export const LearningResultDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const learningResultEntity = useAppSelector(state => state.learningResult.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="learningResultDetailsHeading">
          <Translate contentKey="ceetApp.learningResult.detail.title">LearningResult</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{learningResultEntity.id}</dd>
          <dt>
            <span id="resultCode">
              <Translate contentKey="ceetApp.learningResult.resultCode">Result Code</Translate>
            </span>
          </dt>
          <dd>{learningResultEntity.resultCode}</dd>
          <dt>
            <span id="denomination">
              <Translate contentKey="ceetApp.learningResult.denomination">Denomination</Translate>
            </span>
          </dt>
          <dd>{learningResultEntity.denomination}</dd>
          <dt>
            <Translate contentKey="ceetApp.learningResult.learningCompetence">Learning Competence</Translate>
          </dt>
          <dd>{learningResultEntity.learningCompetence ? learningResultEntity.learningCompetence.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/learning-result" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/learning-result/${learningResultEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LearningResultDetail;
