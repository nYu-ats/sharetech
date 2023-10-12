import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MovieIcon } from "./MovieIcon";

export default {
  title: "Components/Assets/Icon/Common/LinkIcon",
  component: MovieIcon,
  args: {
    color: "SITECOLOR",
    hoverColor: "BLACK",
    size: "SMALL",
  },
} as ComponentMeta<typeof MovieIcon>;

const Template: ComponentStory<typeof MovieIcon> = (args) => <MovieIcon {...args} />;

export const Default = Template.bind({});
Default.args = {};
