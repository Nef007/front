import { Select, Tag } from "antd";
import "./style.css";
import { observer } from "mobx-react-lite";
import { useRootStore } from "../../store";
export const SelectCustom = observer(
  ({ onChange, onSelect, onDeselect, defaultValue = [], loading }) => {
    const { tagsStore, contactsStore } = useRootStore();

    let options = tagsStore.tags.map((item) => ({
      value: item.id,
      label: item.text,
      color: item.color,
    }));
    const tagRender = (props) => {
      const { label, value, closable, onClose } = props;
      const onPreventMouseDown = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };

      return (
        <Tag
          color={options.filter((item) => item.value === value)[0].color}
          onMouseDown={onPreventMouseDown}
          closable={closable}
          onClose={onClose}
          style={{
            marginRight: 3,
          }}
        >
          {label}
        </Tag>
      );
    };

    return (
      <Select
        labelInValue
        onChange={onChange}
        mode="multiple"
        showArrow
        disabled={loading}
        loading={loading}
        tagRender={tagRender}
        value={defaultValue}
        onSelect={onSelect}
        onDeselect={onDeselect}
        style={{
          width: "100%",
        }}
        options={options}
      />
    );
  }
);
