import { ComponentStory, ComponentMeta } from "@storybook/react";
import Component from "./Base.template";

export default {
  title: "Components/Templates/Base",
  component: Component,
  args: {
    hasFooter: true,
    children: (
      <div className="w-full bg-white h-96">
        <p>Sample</p>
      </div>
    ),
  },
} as ComponentMeta<typeof Component>;

const Template: ComponentStory<typeof Component> = (args) => <Component {...args} />;

export const Default = Template.bind({});
Default.args = {};
