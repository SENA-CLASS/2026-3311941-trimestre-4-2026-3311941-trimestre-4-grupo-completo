import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './learning-competence.reducer';

export const LearningCompetenceDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const learningCompetenceEntity = useAppSelector(state => state.learningCompetence.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="learningCompetenceDetailsHeading">
          <Translate contentKey="ceet2App.learningCompetence.detail.title">LearningCompetence</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{learningCompetenceEntity.id}</dd>
          <dt>
            <span id="competenceCode">
              <Translate contentKey="ceet2App.learningCompetence.competenceCode">Competence Code</Translate>
            </span>
          </dt>
          <dd>{learningCompetenceEntity.competenceCode}</dd>
          <dt>
            <span id="competitionDenomination">
              <Translate contentKey="ceet2App.learningCompetence.competitionDenomination">Competition Denomination</Translate>
            </span>
          </dt>
          <dd>{learningCompetenceEntity.competitionDenomination}</dd>
          <dt>
            <Translate contentKey="ceet2App.learningCompetence.trainingProgram">Training Program</Translate>
          </dt>
          <dd>{learningCompetenceEntity.trainingProgram ? learningCompetenceEntity.trainingProgram.id : ''}</dd>
        </dl>
        <Button as={Link as any} to="/learning-competence" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/learning-competence/${learningCompetenceEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default LearningCompetenceDetail;
