import React, { useEffect } from 'react';
import { Button, Col, FormText, Row } from 'react-bootstrap';
import { Translate, ValidatedField, ValidatedForm, translate } from 'react-jhipster';
import { Link, useNavigate, useParams } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getEntities as getCampuses } from 'app/entities/campus/campus.reducer';
import { getEntities as getClassroomTypes } from 'app/entities/classroom-type/classroom-type.reducer';
import { Limitation } from 'app/shared/model/enumerations/limitation.model';
import { State } from 'app/shared/model/enumerations/state.model';

import { createEntity, getEntity, reset, updateEntity } from './classroom.reducer';

export const ClassroomUpdate = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { id } = useParams<'id'>();
  const isNew = id === undefined;

  const classroomTypes = useAppSelector(state => state.classroomType.entities);
  const campuses = useAppSelector(state => state.campus.entities);
  const classroomEntity = useAppSelector(state => state.classroom.entity);
  const loading = useAppSelector(state => state.classroom.loading);
  const updating = useAppSelector(state => state.classroom.updating);
  const updateSuccess = useAppSelector(state => state.classroom.updateSuccess);
  const stateValues = Object.keys(State);
  const limitationValues = Object.keys(Limitation);

  const handleClose = () => {
    navigate(`/classroom${location.search}`);
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(id));
    }

    dispatch(getClassroomTypes({}));
    dispatch(getCampuses({}));
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    const entity = {
      ...classroomEntity,
      ...values,
      classroomType: classroomTypes.find(it => it.id.toString() === values.classroomType?.toString()),
      campus: campuses.find(it => it.id.toString() === values.campus?.toString()),
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {}
      : {
          classroomState: 'ACTIVE',
          limitation: 'WITH_LIMITATION',
          ...classroomEntity,
          classroomType: classroomEntity?.classroomType?.id,
          campus: classroomEntity?.campus?.id,
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="ceet2App.classroom.home.createOrEditLabel" data-cy="ClassroomCreateUpdateHeading">
            <Translate contentKey="ceet2App.classroom.home.createOrEditLabel">Create or edit a Classroom</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew && (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="classroom-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              )}
              <ValidatedField
                label={translate('ceet2App.classroom.classroomNumber')}
                id="classroom-classroomNumber"
                name="classroomNumber"
                data-cy="classroomNumber"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 50, message: translate('entity.validation.maxlength', { max: 50 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.classroom.classroomDescription')}
                id="classroom-classroomDescription"
                name="classroomDescription"
                data-cy="classroomDescription"
                type="text"
                validate={{
                  required: { value: true, message: translate('entity.validation.required') },
                  maxLength: { value: 1000, message: translate('entity.validation.maxlength', { max: 1000 }) },
                }}
              />
              <ValidatedField
                label={translate('ceet2App.classroom.classroomState')}
                id="classroom-classroomState"
                name="classroomState"
                data-cy="classroomState"
                type="select"
              >
                {stateValues.map(state => (
                  <option value={state} key={state}>
                    {translate(`ceet2App.State.${state}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                label={translate('ceet2App.classroom.limitation')}
                id="classroom-limitation"
                name="limitation"
                data-cy="limitation"
                type="select"
              >
                {limitationValues.map(limitation => (
                  <option value={limitation} key={limitation}>
                    {translate(`ceet2App.Limitation.${limitation}`)}
                  </option>
                ))}
              </ValidatedField>
              <ValidatedField
                id="classroom-classroomType"
                name="classroomType"
                data-cy="classroomType"
                label={translate('ceet2App.classroom.classroomType')}
                type="select"
                required
              >
                <option value="" key="0" />
                {classroomTypes
                  ? classroomTypes.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.typeClassroom}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <ValidatedField
                id="classroom-campus"
                name="campus"
                data-cy="campus"
                label={translate('ceet2App.classroom.campus')}
                type="select"
                required
              >
                <option value="" key="0" />
                {campuses
                  ? campuses.map(otherEntity => (
                      <option value={otherEntity.id} key={otherEntity.id}>
                        {otherEntity.campusName}
                      </option>
                    ))
                  : null}
              </ValidatedField>
              <FormText>
                <Translate contentKey="entity.validation.required">This field is required.</Translate>
              </FormText>
              <Button as={Link as any} id="cancel-save" data-cy="entityCreateCancelButton" to="/classroom" replace variant="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button variant="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ClassroomUpdate;
