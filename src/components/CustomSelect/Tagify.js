import Tags from "@yaireo/tagify/dist/react.tagify";
import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";

// A React component for a tagify "tag"

const Tagify = observer(
  ({
    defaultValue = [],
    loading,
    onChange = () => {},
    onAdd = () => {},
    onRemove = () => {},
  }) => {
    const { tagsStore } = useRootStore();

    const setting = {
      delimiters: ",| ", // [RegEx] split tags by any of these delimiters ("null" to cancel) Example: ",| |."
      pattern: /^.{0,20}$/, // RegEx pattern to validate input by. Ex: /[1-9]/
      // tagTextProp: "value", // tag data Object property which will be displayed as the tag's text
      maxTags: 10, // Maximum number of tags
      // callbacks: {}, // Exposed callbacks object to be triggered on certain events
      //  addTagOnBlur: true, // automatically adds the text which was inputed as a tag when blur event happens
      // onChangeAfterBlur: true, // By default, the native way of inputs' onChange events is kept, and it only fires when the field is blured.
      duplicates: false, // "true" - allow duplicate tags
      whitelist: tagsStore.tags.map((item) => ({
        id: item.id,
        value: item.text,
        color: item.color,
      })), // Array of tags to suggest as the user types (can be used along with "enforceWhitelist" setting)
      blacklist: [], // A list of non-allowed tags
      enforceWhitelist: true, // Only allow tags from the whitelist
      //  userInput: true, // disable manually typing/pasting/editing tags (tags may only be added from the whitelist)
      // keepInvalidTags: false, // if true, do not remove tags which did not pass validation
      //  createInvalidTags: true, // if false, do not create invalid tags from invalid user input
      //  mixTagsAllowedAfter: /,|\.|\:|\s/, // RegEx - Define conditions in which mix-tags content allows a tag to be added after
      // mixTagsInterpolator: ["[[", "]]"], // Interpolation for mix mode. Everything between these will become a tag, if is a valid Object
      backspace: false, // false / true / "edit"
      // skipInvalid: false, // If `true`, do not add invalid, temporary, tags before automatically removing them
      //  pasteAsTags: true, // automatically converts pasted text into tags. if "false", allows for further text editing

      dropdown: {
        enabled: 1, // show suggestion after 1 typed character
        fuzzySearch: false, // match only suggestions that starts with the typed characters
        position: "text", // position suggestions list next to typed text
        caseSensitive: true, // allow adding duplicate items if their case is different
      },
      templates: {
        dropdownItemNoMatch: function (data) {
          return `<div class='${this.settings.classNames.dropdownItem}' value="noMatch" tabindex="0" role="option">
				Не найдено: <strong>${data.value}</strong>
			</div>`;
        },
      },
      editTags: false, // 1 or 2 clicks to edit a tag. false/null for not allowing editing
      transformTag: transformTag, // Takes a tag input string as argument and returns a transformed value
      trim: true, // whether or not the value provided should be trimmed, before being added as a tag
      // a11y: {
      //   focusableTags: false,
      // },
      placeholder: "Введите текст",

      // mixMode: {
      //   insertAfterTag: "\u00A0", // String/Node to inject after a tag has been added (see #588)
      // },

      // autoComplete: {
      //   enabled: true, // Tries to suggest the input's value while typing (match from whitelist) by adding the rest of term as grayed-out text
      //   rightKey: false, // If `true`, when Right key is pressed, use the suggested value to create a tag, else just auto-completes the input. in mixed-mode this is set to "true"
      // },
    };

    function transformTag(tagData) {
      // tagData.color = getRandomColor();
      tagData.style = "--tag-bg:" + tagData.color;
    }
    const onChangeT = (e) => {
      console.log("CHANGED:", e.detail.tagify.getCleanValue());
      return {
        target: {
          name: "tags",
          value: e.detail.tagify.getCleanValue().map((item) => ({
            id: item.id,
            color: item.color,
            text: item.value,
          })),
        },
      };
    };

    const onAddT = (e) => {
      console.log("ADD:", e.detail.data);
      onAdd(e.detail.data);
    };
    const onRemoveT = (e) => {
      console.log("REMOVE:", e.detail.data);
      onRemove(e.detail.data);
    };
    return (
      <Tags
        loading={loading}
        settings={setting}
        // defaultValue={
        //   defaultValue &&
        //   defaultValue.map((item) => ({
        //     value: item.text,
        //     id: item.id,
        //     color: item.color,
        //   }))
        // }
        defaultValue={defaultValue.map((item) => ({
          value: item.text,
          id: item.id,
          color: item.color,
        }))}
        onChange={(e) =>
          onChange(
            e.detail.tagify.getCleanValue().map((item) => ({
              id: item.id,
              color: item.color,
              text: item.value,
            }))
          )
        }
        // autoFocus={true}
        onAdd={onAddT}
        onRemove={onRemoveT}
      />
    );
  }
);

export default Tagify;
