<?php

/**
 * This file is part of menatwork/contao-multicolumnwizard-bundle.
 *
 * (c) 2012-2019 MEN AT WORK.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 *
 * This project is provided in good faith and hope to be usable by anyone.
 *
 * @package    menatwork/contao-multicolumnwizard-bundle
 * @author     Christian Schiffler <c.schiffler@cyberspectrum.de>
 * @author     Stefan Heimes <stefan_heimes@hotmail.com>
 * @copyright  2011 Andreas Schempp
 * @copyright  2011 certo web & design GmbH
 * @copyright  2013-2019 MEN AT WORK
 * @license    https://github.com/menatwork/contao-multicolumnwizard-bundle/blob/master/LICENSE LGPL-3.0-or-later
 * @filesource
 */

namespace MenAtWork\MultiColumnWizardBundle\Event;

/**
 * Class GetColorPickerStringEvent
 */
class GetColorPickerStringEvent extends GetStringEvent
{
    /**
     * Name of the event.
     */
    const NAME = 'men-at-work.multi-column-wizard-bundle.get-color-picker';

    /**
     * @var string
     */
    private $colorPicker;

    /**
     * @var string
     */
    private $fieldName;

    /**
     * GetDatePickerEvent constructor.
     *
     * @param string $version            The version of Contao.
     *
     * @param string $build              The build of Contao.
     *
     * @param string $fieldId            The field id.
     *
     * @param string $tableName          The name of the table.
     *
     * @param array  $fieldConfiguration The configuration of the field.
     *
     * @param string $fieldName          TODO: What is this?
     *
     */
    public function __construct(
        string $version,
        string $build,
        string $fieldId,
        string $tableName,
        array $fieldConfiguration,
        string $fieldName
    ) {
        parent::__construct($version, $build, $fieldId, $tableName, $fieldConfiguration);

        $this->fieldName = $fieldName;
    }

    /**
     * The ColorPicker string.
     *
     * @param string $string The ColorPicker string.
     *
     * @return $this
     */
    public function setColorPicker($string)
    {
        $this->colorPicker = $string;

        return $this;
    }

    /**
     * Get the ColorPicker string.
     *
     * @return string
     */
    public function getColorPicker()
    {
        return $this->colorPicker;
    }

    /**
     * @return string
     */
    public function getFieldName(): string
    {
        return $this->fieldName;
    }
}
