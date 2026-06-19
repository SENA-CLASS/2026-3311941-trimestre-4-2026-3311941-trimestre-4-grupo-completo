import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './training-program.reducer';

export const TrainingProgramDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const trainingProgramEntity = useAppSelector(state => state.trainingProgram.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="trainingProgramDetailsHeading">
          <Translate contentKey="ceet2App.trainingProgram.detail.title">TrainingProgram</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{trainingProgramEntity.id}</dd>
          <dt>
            <span id="programCode">
              <Translate contentKey="ceet2App.trainingProgram.programCode">Program Code</Translate>
            </span>
          </dt>
          <dd>{trainingProgramEntity.programCode}</dd>
          <dt>
            <span id="programVersion">
              <Translate contentKey="ceet2App.trainingProgram.programVersion">Program Version</Translate>
            </span>
          </dt>
          <dd>{trainingProgramEntity.programVersion}</dd>
          <dt>
            <span id="programName">
              <Translate contentKey="ceet2App.trainingProgram.programName">Program Name</Translate>
            </span>
          </dt>
          <dd>{trainingProgramEntity.programName}</dd>
          <dt>
            <span id="programInitials">
              <Translate contentKey="ceet2App.trainingProgram.programInitials">Program Initials</Translate>
            </span>
          </dt>
          <dd>{trainingProgramEntity.programInitials}</dd>
          <dt>
            <span id="programState">
              <Translate contentKey="ceet2App.trainingProgram.programState">Program State</Translate>
            </span>
          </dt>
          <dd>{trainingProgramEntity.programState}</dd>
          <dt>
            <Translate contentKey="ceet2App.trainingProgram.levelEducation">Level Education</Translate>
          </dt>
          <dd>{trainingProgramEntity.levelEducation ? trainingProgramEntity.levelEducation.levelName : ''}</dd>
        </dl>
        <Button as={Link as any} to="/training-program" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/training-program/${trainingProgramEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default TrainingProgramDetail;
