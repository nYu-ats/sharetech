import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./CreateSalesContentForm";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Organisms/Form/CreateSalesContentForm",
  component: Component,
  args: {
    value: "",
    onClick: action("clicked"),
    onSubmit: action("submited"),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
