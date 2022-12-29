import { observer } from "mobx-react-lite";
import { useRootStore } from "./store";
import { useState } from "react";
export const ModalEdit = observer(() => {
  const { taskStore, notification } = useRootStore();

  return (
      <div className="modal fade" id="contactsEditModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
           aria-hidden="true"><!-- modal begin -->
          <div className="modal-dialog">
              <div className="modal-content">
                  <div className="modal-header">
                      <h1 className="modal-title fs-5" id="exampleModalLabel">Редактирование контакта</h1>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                      <form>
                          <div className="mb-3">
                              <label htmlFor="recipient-name" className="col-form-label">Имя:</label>
                              <input type="text" className="form-control" id="recipient-name"/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="recipient-email" className="col-form-label">Почта:</label>
                              <input type="email" className="form-control" id="recipient-email"/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="recipient-phone" className="col-form-label">Телефон:</label>
                              <input type="tel" className="form-control" id="recipient-phone"/>
                          </div>
                          <div className="mb-3">
                              <label htmlFor="recipient-phone" className="col-form-label">Теги:</label>
                              <input className="tags" name='tags-edit' value='[{"value":"point"}, {"value":"soft"}]'
                                     pattern='^[A-Za-z_✲ ]{1,15}$' />
                          </div>
                      </form>
                  </div>
                  <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                      <button type="button" className="btn btn-primary">Сохранить</button>
                  </div>
              </div>
          </div>
      </div><!-- modal end -->
  );
});
