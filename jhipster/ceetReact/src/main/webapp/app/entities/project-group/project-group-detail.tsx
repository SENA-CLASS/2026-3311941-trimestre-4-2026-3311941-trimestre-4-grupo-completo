import React, { useEffect } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import { Translate } from 'react-jhipster';
import { Link, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntity } from './project-group.reducer';

export const ProjectGroupDetail = () => {
  const dispatch = useAppDispatch();

  const { id } = useParams<'id'>();

  useEffect(() => {
    dispatch(getEntity(id!));
  }, []);

  const projectGroupEntity = useAppSelector(state => state.projectGroup.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="projectGroupDetailsHeading">
          <Translate contentKey="ceetApp.projectGroup.detail.title">ProjectGroup</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{projectGroupEntity.id}</dd>
          <dt>
            <span id="groupNumber">
              <Translate contentKey="ceetApp.projectGroup.groupNumber">Group Number</Translate>
            </span>
          </dt>
          <dd>{projectGroupEntity.groupNumber}</dd>
          <dt>
            <span id="projectName">
              <Translate contentKey="ceetApp.projectGroup.projectName">Project Name</Translate>
            </span>
          </dt>
          <dd>{projectGroupEntity.projectName}</dd>
          <dt>
            <span id="projectGroupState">
              <Translate contentKey="ceetApp.projectGroup.projectGroupState">Project Group State</Translate>
            </span>
          </dt>
          <dd>{projectGroupEntity.projectGroupState}</dd>
          <dt>
            <Translate contentKey="ceetApp.projectGroup.course">Course</Translate>
          </dt>
          <dd>{projectGroupEntity.course ? projectGroupEntity.course.courseNumber : ''}</dd>
        </dl>
        <Button as={Link as any} to="/project-group" replace variant="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button as={Link as any} to={`/project-group/${projectGroupEntity.id}/edit`} replace variant="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default ProjectGroupDetail;
