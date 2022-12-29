import { observer } from "mobx-react-lite";
import { useRootStore } from "./store";
import { useState } from "react";
export const ModalTagsEdit = observer(() => {
  const { taskStore, notification } = useRootStore();

  return (
      <div class="modal fade" id="multipleTagsEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"><!-- modal begin -->
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title fs-5">Массовое редактирование тегов</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                      <form>
                          <div class="mb-3">
                              <input name='basic' value='tag1, tag2, tag3, tag4, tag5, tag6, tag7, tag8'/>
                          </div>
                      </form>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                      <button type="button" class="btn btn-primary">Сохранить</button>
                  </div>
              </div>
          </div>
      </div>
  );
});
